import logger from '../utils/logger';
import { getRabbitMqChannel } from '../utils/rabbitmq';
import netflow from './netflow';
import { createHttpClient } from '../utils/httpClient';
import { Parser as Json2CsvParser } from 'json2csv';
import fs from 'fs';
import _ from 'lodash';
import request from 'request-promise';
import { login } from '../utils/auth';
import { file as tmpFile } from 'tmp-promise';
import util from 'util';
import syslog from './syslog';
import {
  GeneralReportRequestTask,
  LOCAL_TIME_ZONE,
  LOGGER_TIME_ZONE,
  NetflowReportRequestTask,
  QUEUES,
  REPORT_TYPE,
  SyslogReportRequestTask,
} from '../typings';
import moment = require('moment');
import momentTz = require('moment-timezone');
import { Error } from 'tslint/lib/error';

// Convert fs.readFile into Promise version of same

const log = logger.createLogger();
const REPORT_CONTAINER = process.env.REPORT_CONTAINER || 'reports';
const UPLOAD_API = `${
  process.env.API_ADDRESS
}/api/BigFiles/${REPORT_CONTAINER}/upload`;
const REPORT_API = `${process.env.API_ADDRESS}/api/Reports`;

if (
  !process.env.SERVICE_MAN_USERNAME ||
  !process.env.SERVICE_MAN_PASSWORD ||
  !process.env.API_ADDRESS
) {
  throw new Error('invalid auth env variables');
}

export const processLogRequest = async () => {
  log.debug('At processing log requests');
  const channel = await getRabbitMqChannel();
  channel.prefetch(4, true);
  process.once('SIGINT', async () => {
    await channel.close();
  });
  channel.consume(
    QUEUES.LOG_WORKER_QUEUE,
    async (message) => {
      if (!message) {
        log.debug('empty message:', message);
        throw new Error('empty message');
      }

      const body = message.content.toString();
      log.debug(" [x] Received Log Request '%s'", body);
      const generalReportRequestTask: GeneralReportRequestTask = JSON.parse(
        body,
      );

      if (!generalReportRequestTask.to) {
        generalReportRequestTask.toDate = momentTz.tz(LOGGER_TIME_ZONE);
        generalReportRequestTask.to = momentTz(
          generalReportRequestTask.toDate,
          LOCAL_TIME_ZONE,
        ).valueOf();
      } else {
        generalReportRequestTask.toDate = momentTz.tz(
          generalReportRequestTask.to,
          LOGGER_TIME_ZONE,
        );
      }

      // create fromDate 1 year before from Date
      if (!generalReportRequestTask.from) {
        generalReportRequestTask.fromDate = momentTz.tz(
          generalReportRequestTask.toDate.valueOf() - 31539999 * 1000,
          LOGGER_TIME_ZONE,
        );
        generalReportRequestTask.from = momentTz(
          generalReportRequestTask.fromDate,
          LOCAL_TIME_ZONE,
        ).valueOf();
      } else {
        generalReportRequestTask.fromDate = momentTz.tz(
          generalReportRequestTask.from,
          LOGGER_TIME_ZONE,
        );
      }
      log.debug(
        `Create ${generalReportRequestTask.type} report from ${
          generalReportRequestTask.fromDate
        } to ${generalReportRequestTask.toDate}`,
        JSON.stringify(generalReportRequestTask),
      );

      try {
        let reports: any;
        let fields: string[];
        if (generalReportRequestTask.type === REPORT_TYPE.NETFLOW) {
          reports = await netflow.getNetflowReports(
            generalReportRequestTask as NetflowReportRequestTask,
          );
          fields = getNetflowFields();
        } else if (generalReportRequestTask.type === REPORT_TYPE.SYSLOG) {
          reports = await syslog.getSyslogReports(
            generalReportRequestTask as SyslogReportRequestTask,
          );
          fields = getSyslogFields();
        } else {
          channel.ack(message);
          throw new Error('invalid report type');
        }

        log.debug(`index one of result size: ${reports.length}`);
        const csvReport = jsonToCsv(fields, reports);
        log.debug(`csv created`);
        await uploadReport(generalReportRequestTask, csvReport);
        log.debug(`uploaded`);
        channel.ack(message);
      } catch (error) {
        log.error(error);
        channel.nack(message, false, false);
      }
    },
    { noAck: false },
  );
};

const getNetflowFields = () => {
  return [
    'Router',
    'Username',
    'Jalali_Date',
    'Mac',
    'Src_Addr',
    'Src_Port',
    'Dst_Addr',
    'Dst_Port',
    'Protocol',
    'Gregorian_Date',
  ];
};

const getSyslogFields = () => {
  return [
    'Router',
    'Username',
    'IP',
    'Mac',
    'Jalali_Date',
    'Http_Method',
    'Domain',
    'Url',
    'Gregorian_Date',
  ];
};
const jsonToCsv = (fields: string[], jsonData: any[]) => {
  try {
    const opts = { fields, defaultValue: 'N/A' };
    const json2CsvParser = new Json2CsvParser(opts);
    const csvReport = json2CsvParser.parse(jsonData);
    return csvReport;
  } catch (error) {
    log.error(error);
    throw error;
  }
};

const writeFile = util.promisify(fs.writeFile);
const closeFile = util.promisify(fs.close);
const unlink = util.promisify(fs.unlink);
const uploadReport = async (
  reportRequest: GeneralReportRequestTask,
  csv: string,
) => {
  const reportFile = await tmpFile();
  await writeFile(reportFile.path, csv, 'utf8');
  await closeFile(reportFile.fd);
  log.debug(reportFile.path);
  const token = await login(
    // @ts-ignore
    process.env.SERVICE_MAN_USERNAME,
    process.env.SERVICE_MAN_PASSWORD,
  );
  const fileName = `${Date.now().toString()}.csv`;
  const options = {
    method: 'POST',
    url: UPLOAD_API,
    timeout: 600000,
    headers: {
      authorization: token,
      Accept: 'application/json',
      'cache-control': 'no-cache',
      'content-type':
        'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    },
    formData: {
      businessId: reportRequest.businessId,
      myfile: {
        value: fs.createReadStream(reportFile.path),
        options: { filename: fileName, contentType: 'text/csv' },
      },
    },
  };
  const response: string = await request(options);
  await unlink(reportFile.path);
  log.debug(JSON.parse(response));
  await updateReportRequest(reportRequest, {
    container: REPORT_CONTAINER,
    fileName: fileName,
  });
};

const updateReportRequest = async (
  reportRequest: GeneralReportRequestTask,
  fileInfo: { fileName: string; container: string },
) => {
  const token = await login(
    // @ts-ignore
    process.env.SERVICE_MAN_USERNAME,
    process.env.SERVICE_MAN_PASSWORD,
  );
  log.debug('report:', reportRequest.id);
  log.debug('file:', fileInfo);
  const update = {
    status: 'ready',
    container: fileInfo.container,
    fileName: fileInfo.fileName,
    from: reportRequest.from,
    to: reportRequest.to,
  };

  const httpClient = createHttpClient(`${REPORT_API}`);
  await httpClient.patch(`/${reportRequest.id}`, update, {
    headers: {
      authorization: token,
    },
  });
};
