(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./controllers/index.ts":
/*!******************************!*\
  !*** ./controllers/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst logger_1 = __importDefault(__webpack_require__(/*! ../utils/logger */ \"./utils/logger.ts\"));\nconst typings_1 = __webpack_require__(/*! ../typings */ \"./typings/index.ts\");\nconst netflow_1 = __importDefault(__webpack_require__(/*! ../modules/netflow */ \"./modules/netflow.ts\"));\nconst reportTypes_1 = __webpack_require__(/*! ../reportEngine/reportTypes */ \"./reportEngine/reportTypes.ts\");\nconst fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\nconst reportEngine_1 = __importDefault(__webpack_require__(/*! ../reportEngine */ \"./reportEngine/index.ts\"));\nconst tmp_promise_1 = __webpack_require__(/*! tmp-promise */ \"tmp-promise\");\nconst dns_1 = __importDefault(__webpack_require__(/*! ../modules/dns */ \"./modules/dns.ts\"));\nconst webproxy_1 = __importDefault(__webpack_require__(/*! ../modules/webproxy */ \"./modules/webproxy.ts\"));\nconst log = logger_1.default.createLogger();\nconst momentTz = __webpack_require__(/*! moment-timezone */ \"moment-timezone\");\nconst controller = {\n    health: (request, response) => {\n        response.send({ ok: true });\n    },\n    searchNetflow: async (request, response) => {\n        let { to, limit, from, skip, } = request.query;\n        const { type, departments, businessId, username, srcAddress, srcPort, dstAddress, dstPort, } = request.query;\n        from = Number(from);\n        to = Number(to);\n        skip = Number(skip);\n        limit = Number(limit);\n        log.debug(request.body);\n        const netflowReportRequestTask = {\n            type,\n            fromDate: momentTz.tz(from, typings_1.LOGGER_TIME_ZONE),\n            toDate: momentTz.tz(to, typings_1.LOGGER_TIME_ZONE),\n            departments,\n            username,\n            businessId,\n            srcAddress,\n            dstAddress,\n            srcPort,\n            dstPort,\n            limit,\n            skip,\n        };\n        log.debug(`Create netflow report from ${netflowReportRequestTask.fromDate} to ${netflowReportRequestTask.toDate}`, JSON.stringify(netflowReportRequestTask));\n        try {\n            if (type === 'json') {\n                const result = await netflow_1.default.query('json', netflowReportRequestTask);\n                result.data = netflow_1.default.formatJson(result.data);\n                response.send(result);\n            }\n            else if (type === 'csv') {\n                const result = await netflow_1.default.query('json', netflowReportRequestTask);\n                result.data = netflow_1.default.formatJson(result.data);\n                const reportConfig = reportTypes_1.getReportConfig(\"csv\" /* CSV */, typings_1.REPORT_TYPE.NETFLOW);\n                const report = await reportEngine_1.default(reportConfig, result.data);\n                log.debug('rendered', report);\n                const reportFile = await tmp_promise_1.file();\n                const writable = fs.createWriteStream(reportFile.path);\n                writable.write(report, 'utf8');\n                writable.close();\n                writable.on('finish', () => {\n                    log.debug('reportFile.path', reportFile.path);\n                    response.sendFile(reportFile.path);\n                });\n                writable.on('error', (error) => {\n                    log.error(error);\n                    response.status(500).send('Something broke!');\n                });\n            }\n            else if (type === 'excel') {\n                const result = await netflow_1.default.query('json', netflowReportRequestTask);\n                result.data = netflow_1.default.formatJson(result.data);\n                const reportConfig = reportTypes_1.getReportConfig(\"excel\" /* EXCEL */, typings_1.REPORT_TYPE.NETFLOW);\n                const report = await reportEngine_1.default(reportConfig, { netflow: result.data });\n                const reportStream = report;\n                const reportFile = await tmp_promise_1.file();\n                const writable = fs.createWriteStream(reportFile.path);\n                await reportStream.stream.pipe(writable);\n                writable.on('finish', () => {\n                    log.debug(`report file is ready ${reportFile.path}`);\n                    response.sendFile(reportFile.path);\n                });\n                writable.on('error', (error) => {\n                    log.error(error);\n                    response.status(500).send('Something broke!');\n                });\n            }\n            else {\n                throw new Error('unknown report type');\n            }\n        }\n        catch (e) {\n            log.error(e);\n            throw e;\n        }\n    },\n    searchDns: async (request, response) => {\n        let { to, limit, from, skip, } = request.query;\n        const { type, departments, businessId, username, domain, aggregate, } = request.query;\n        from = Number(from);\n        to = Number(to);\n        skip = Number(skip);\n        limit = Number(limit);\n        log.debug(request.body);\n        const dnsReportRequestTask = {\n            type,\n            fromDate: momentTz.tz(from, typings_1.LOGGER_TIME_ZONE),\n            toDate: momentTz.tz(to, typings_1.LOGGER_TIME_ZONE),\n            departments,\n            username,\n            domain,\n            businessId,\n            aggregate: aggregate === 'true',\n            limit,\n            skip,\n        };\n        log.debug(`Create dns report from ${dnsReportRequestTask.fromDate} to ${dnsReportRequestTask.toDate}`, JSON.stringify(dnsReportRequestTask));\n        try {\n            if (type === 'json') {\n                const result = await dns_1.default.query('json', dnsReportRequestTask);\n                result.data = dns_1.default.formatJson(result.data);\n                response.send(result);\n            }\n            else if (type === 'csv') {\n                const result = await dns_1.default.query('json', dnsReportRequestTask);\n                result.data = dns_1.default.formatJson(result.data);\n                const reportConfig = reportTypes_1.getReportConfig(\"csv\" /* CSV */, typings_1.REPORT_TYPE.DNS);\n                const report = await reportEngine_1.default(reportConfig, result.data);\n                const reportFile = await tmp_promise_1.file();\n                const writable = fs.createWriteStream(reportFile.path);\n                writable.write(report, 'utf8');\n                writable.close();\n                writable.on('finish', () => {\n                    log.debug(`report file is ready ${reportFile.path}`);\n                    response.sendFile(reportFile.path);\n                });\n                writable.on('error', (error) => {\n                    log.error(error);\n                    response.status(500).send('Something broke!');\n                });\n            }\n            else if (type === 'excel') {\n                const result = await dns_1.default.query('json', dnsReportRequestTask);\n                result.data = dns_1.default.formatJson(result.data);\n                const reportConfig = reportTypes_1.getReportConfig(\"excel\" /* EXCEL */, typings_1.REPORT_TYPE.DNS);\n                const report = await reportEngine_1.default(reportConfig, { dns: result.data });\n                const reportStream = report;\n                const reportFile = await tmp_promise_1.file();\n                const writable = fs.createWriteStream(reportFile.path);\n                await reportStream.stream.pipe(writable);\n                writable.on('finish', () => {\n                    log.debug(`report file is ready ${reportFile.path}`);\n                    response.sendFile(reportFile.path);\n                });\n                writable.on('error', (error) => {\n                    log.error(error);\n                    response.status(500).send('Something broke!');\n                });\n            }\n            else {\n                throw new Error('unknown report type');\n            }\n        }\n        catch (e) {\n            log.error(e);\n            throw e;\n        }\n    },\n    searchWebproxy: async (request, response) => {\n        let { to, limit, from, skip, } = request.query;\n        const { type, departments, businessId, domain, url, username, } = request.query;\n        from = Number(from);\n        to = Number(to);\n        skip = Number(skip);\n        limit = Number(limit);\n        log.debug(request.body);\n        const webproxyReportRequestTask = {\n            type,\n            fromDate: momentTz.tz(from, typings_1.LOGGER_TIME_ZONE),\n            toDate: momentTz.tz(to, typings_1.LOGGER_TIME_ZONE),\n            departments,\n            username,\n            domain,\n            url,\n            businessId,\n            limit,\n            skip,\n        };\n        log.debug(`Create webproxy report from ${webproxyReportRequestTask.fromDate} to ${webproxyReportRequestTask.toDate}`, JSON.stringify(webproxyReportRequestTask));\n        try {\n            if (type === 'json') {\n                const result = await webproxy_1.default.query('json', webproxyReportRequestTask);\n                result.data = webproxy_1.default.formatJson(result.data);\n                response.send(result);\n            }\n            else if (type === 'csv') {\n                const result = await webproxy_1.default.query('json', webproxyReportRequestTask);\n                result.data = webproxy_1.default.formatJson(result.data);\n                const reportConfig = reportTypes_1.getReportConfig(\"csv\" /* CSV */, typings_1.REPORT_TYPE.WEBPROXY);\n                const report = await reportEngine_1.default(reportConfig, result.data);\n                const reportFile = await tmp_promise_1.file();\n                const writable = fs.createWriteStream(reportFile.path);\n                writable.write(report, 'utf8');\n                writable.close();\n                writable.on('finish', () => {\n                    log.debug(`report file is ready ${reportFile.path}`);\n                    response.sendFile(reportFile.path);\n                });\n                writable.on('error', (error) => {\n                    log.error(error);\n                    response.status(500).send('Something broke!');\n                });\n            }\n            else if (type === 'excel') {\n                const result = await webproxy_1.default.query('json', webproxyReportRequestTask);\n                result.data = webproxy_1.default.formatJson(result.data);\n                const reportConfig = reportTypes_1.getReportConfig(\"excel\" /* EXCEL */, typings_1.REPORT_TYPE.WEBPROXY);\n                const report = await reportEngine_1.default(reportConfig, { webproxy: result.data });\n                const reportStream = report;\n                const reportFile = await tmp_promise_1.file();\n                const writable = fs.createWriteStream(reportFile.path);\n                await reportStream.stream.pipe(writable);\n                writable.on('finish', () => {\n                    log.debug(`report file is ready ${reportFile.path}`);\n                    response.sendFile(reportFile.path);\n                });\n                writable.on('error', (error) => {\n                    log.error(error);\n                    response.status(500).send('Something broke!');\n                });\n            }\n            else {\n                throw new Error('unknown report type');\n            }\n        }\n        catch (e) {\n            log.error(e);\n            throw e;\n        }\n    },\n};\nexports.default = controller;\n\n\n//# sourceURL=file:////Users/payamyousefi/projects/hotspotplus/log-worker/src/controllers/index.ts");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst routes_1 = __importDefault(__webpack_require__(/*! ../src/routes */ \"./routes/index.ts\"));\nconst errorHandler_1 = __importDefault(__webpack_require__(/*! ./utils/errorHandler */ \"./utils/errorHandler.ts\"));\nconst logger_1 = __importDefault(__webpack_require__(/*! ./utils/logger */ \"./utils/logger.ts\"));\nconst log = logger_1.default.createLogger();\nconst app = express_1.default();\napp.set('port', process.env.PORT || 3000);\napp.use(express_1.default.json());\napp.use(express_1.default.urlencoded({ extended: false }));\napp.use('/', routes_1.default);\napp.use(errorHandler_1.default);\napp.use((req, resp, next) => {\n    log.debug('####### Request Log #######');\n    log.debug('Path:', req.path);\n    log.debug('Query:', req.query);\n    log.debug('Methods:', req.method);\n    log.debug('Body %j', req.body);\n    next();\n});\napp.listen(app.get('port'), async () => {\n    /*tslint:disable*/\n    console.log('Add default queues...');\n    /*\n    await clickHouse.queryNetflow({\n      type: REPORT_TYPE.NETFLOW,\n      id: '123',\n    });*/\n    console.log(`App is running at http://localhost:${app.get('port')}`);\n    //await testRunner();\n    log.info(` App is running at http://localhost:${app.get('port')}`);\n});\nprocess.on('uncaughtException', function (error) {\n    console.error('Something bad happened here....');\n    console.error(error);\n    console.error(error.stack);\n    log.error(error);\n    log.error(error.stack);\n    process.exit(1);\n});\n\n\n//# sourceURL=file:////Users/payamyousefi/projects/hotspotplus/log-worker/src/index.ts");

/***/ }),

/***/ "./modules/dns.ts":
/*!************************!*\
  !*** ./modules/dns.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst logger_1 = __importDefault(__webpack_require__(/*! ../utils/logger */ \"./utils/logger.ts\"));\nconst moment_1 = __importDefault(__webpack_require__(/*! moment */ \"moment\"));\nconst moment_jalaali_1 = __importDefault(__webpack_require__(/*! moment-jalaali */ \"moment-jalaali\"));\nconst typings_1 = __webpack_require__(/*! ../typings */ \"./typings/index.ts\");\nconst clickClient_1 = __webpack_require__(/*! ../utils/clickClient */ \"./utils/clickClient.ts\");\nconst log = logger_1.default.createLogger();\nconst query = async (type, dnsReportRequestTask) => {\n    let mainQuery;\n    let countQuery;\n    if (dnsReportRequestTask.aggregate) {\n        mainQuery = await createAggregatedDnsQuery(dnsReportRequestTask, false);\n        countQuery = await createAggregatedDnsQuery(dnsReportRequestTask, true);\n    }\n    else {\n        mainQuery = await createDnsQuery(dnsReportRequestTask, false);\n        countQuery = await createDnsQuery(dnsReportRequestTask, true);\n    }\n    log.debug({ countQuery });\n    log.debug({ mainQuery });\n    const countResult = await clickClient_1.executeClickQuery(countQuery);\n    const { rows, columns } = await clickClient_1.executeClickQuery(mainQuery);\n    let data;\n    if (type === 'json') {\n        data = rows.map((row) => {\n            return rowValueToJson(columns, row);\n        });\n    }\n    return {\n        data,\n        columns,\n        size: countResult.rows && countResult.rows[0] && countResult.rows[0][0],\n    };\n};\nconst rowValueToJson = (columns, row) => {\n    let i = 0;\n    const jsonRow = {};\n    for (const value of row) {\n        jsonRow[columns[i].name] = value;\n        i++;\n    }\n    return jsonRow;\n};\nconst toJalaliDate = (date) => {\n    return moment_jalaali_1.default(moment_1.default.tz(date, '').tz(typings_1.LOCAL_TIME_ZONE)).format(typings_1.REPORT_PERSIAN_DATE_FORMAT);\n};\nconst toGregorianDate = (date) => {\n    return moment_1.default\n        .tz(date, '')\n        .tz(typings_1.LOCAL_TIME_ZONE)\n        .format(typings_1.REPORT_GREGORIAN_DATE_FORMAT);\n};\nconst formatJson = (data) => {\n    return data.map((row) => {\n        if (row.receivedAt) {\n            row.jalaliDate = toJalaliDate(row.timeRecvd);\n            row.gregorianDate = toGregorianDate(row.timeRecvd);\n        }\n        return row;\n    });\n};\n//group by departmentId,domain and filter by date\n// SELECT departmentId,any(memberId) as memberId,any(nasIp) as nasIp,username , domain,count(domain) as visit FROM hotspotplus.DnsReport GROUP BY departmentId,domain\n//group by username,domain and filter by date\n// SELECT any(departmentId) as departmentId,any(memberId) as memberId,any(nasIp) as nasIp,username,domain,count(domain) as visit FROM hotspotplus.DnsReport GROUP BY username,domain\nconst createAggregatedDnsQuery = (dnsReportRequestTask, count) => {\n    const { departments, domain, fromDate, toDate, businessId, limit, skip, username, } = dnsReportRequestTask;\n    const whereParts = [];\n    let groupBy;\n    let selectQuery;\n    if (count) {\n        selectQuery = `SELECT toInt32(count (*)) FROM hotspotplus.DnsReport  `;\n        groupBy = `GROUP BY domain`;\n    }\n    else if (username) {\n        selectQuery = `SELECT any(departmentId) as departmentId,any(memberId) as memberId,any(nasIp) as nasIp,domain,count(domain) as visit FROM hotspotplus.DnsReport`;\n        groupBy = `GROUP BY username,domain ORDER BY visit DESC`;\n    }\n    else {\n        selectQuery = `SELECT any(departmentId) as departmentId,any(memberId) as memberId,any(nasIp) as nasIp,any(username) as username,domain,count(domain) as visit FROM hotspotplus.DnsReport`;\n        groupBy = `GROUP BY domain ORDER BY visit DESC`;\n    }\n    if (fromDate) {\n        whereParts.push(` receivedAt>=toDateTime('${fromDate.format(typings_1.DATABASE_DATE_FORMAT)}') `);\n    }\n    if (toDate) {\n        whereParts.push(` receivedAt<=toDateTime('${toDate.format(typings_1.DATABASE_DATE_FORMAT)}') `);\n    }\n    if (username) {\n        whereParts.push(` username='${username}' `);\n    }\n    /*\n  \n    if (domain) {\n      whereParts.push(` domain like '%${domain}%' `);\n    }\n  */\n    if (businessId) {\n        whereParts.push(` businessId='${businessId}' `);\n    }\n    /*if (departments && departments.length > 0) {\n      const departmentsIdQueries: string[] = [];\n      for (const department of departments) {\n        departmentsIdQueries.push(` departmentId='${department}' `);\n      }\n      whereParts.push(` (${departmentsIdQueries.join(' OR ')}) `);\n    }*/\n    let mainQuery = whereParts.length > 0\n        ? `${selectQuery} WHERE ${whereParts.join(' AND ')} ${groupBy} `\n        : `${selectQuery} ${groupBy}`;\n    if (!count && limit >= 0 && skip >= 0) {\n        mainQuery = `${mainQuery} LIMIT ${limit}  OFFSET ${skip} `;\n    }\n    return mainQuery;\n};\nconst createDnsQuery = (dnsReportRequestTask, count) => {\n    const { departments, domain, fromDate, toDate, businessId, limit, skip, username, } = dnsReportRequestTask;\n    let mainQuery;\n    mainQuery = count\n        ? `SELECT toInt32(count (*)) FROM hotspotplus.DnsReport`\n        : `SELECT businessId,departmentId, memberId, nasIp, username, domain, receivedAt FROM hotspotplus.DnsReport`;\n    const whereParts = [];\n    if (fromDate) {\n        whereParts.push(` receivedAt>=toDateTime('${fromDate.format(typings_1.DATABASE_DATE_FORMAT)}') `);\n    }\n    if (toDate) {\n        whereParts.push(` receivedAt<=toDateTime('${toDate.format(typings_1.DATABASE_DATE_FORMAT)}') `);\n    }\n    if (username) {\n        whereParts.push(` username='${username}' `);\n    }\n    if (domain) {\n        whereParts.push(` domain like '%${domain}%' `);\n    }\n    if (businessId) {\n        whereParts.push(` businessId='${businessId}' `);\n    }\n    if (departments && departments.length > 0) {\n        const departmentsIdQueries = [];\n        for (const department of departments) {\n            departmentsIdQueries.push(` departmentId='${department}' `);\n        }\n        whereParts.push(` (${departmentsIdQueries.join(' OR ')}) `);\n    }\n    if (whereParts.length > 0) {\n        mainQuery = `${mainQuery} WHERE  ${whereParts.join(' AND ')}`;\n    }\n    if (!count && limit >= 0 && skip >= 0) {\n        mainQuery = `${mainQuery} LIMIT ${limit}  OFFSET ${skip} `;\n    }\n    return mainQuery;\n};\nexports.default = {\n    query,\n    formatJson,\n};\n\n\n//# sourceURL=file:////Users/payamyousefi/projects/hotspotplus/log-worker/src/modules/dns.ts");

/***/ }),

/***/ "./modules/netflow.ts":
/*!****************************!*\
  !*** ./modules/netflow.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst logger_1 = __webpack_require__(/*! ../utils/logger */ \"./utils/logger.ts\");\nconst typings_1 = __webpack_require__(/*! ../typings */ \"./typings/index.ts\");\nconst moment_1 = __importDefault(__webpack_require__(/*! moment */ \"moment\"));\nconst moment_jalaali_1 = __importDefault(__webpack_require__(/*! moment-jalaali */ \"moment-jalaali\"));\nconst clickClient_1 = __webpack_require__(/*! ../utils/clickClient */ \"./utils/clickClient.ts\");\nconst log = logger_1.createLogger();\nconst createNetflowQuery = (netflowReportRequestTask, count) => {\n    const { skip, limit, businessId, toDate, fromDate, departments, srcPort, dstAddress, dstPort, srcAddress, username, } = netflowReportRequestTask;\n    let mainQuery;\n    if (count) {\n        mainQuery = ` SELECT toInt32(count(*)) as size FROM hotspotplus.NetflowReport `;\n    }\n    else {\n        mainQuery = ` SELECT businessId,departmentId,memberId,nasIp,username,routerAddr,srcIp,\n  dstIp, srcPort,dstPort,timeRecvd,proto FROM hotspotplus.NetflowReport `;\n    }\n    const whereParts = [];\n    if (fromDate) {\n        whereParts.push(` timeRecvd>=toDateTime('${fromDate.format(typings_1.DATABASE_DATE_FORMAT)}') `);\n    }\n    if (toDate) {\n        whereParts.push(` timeRecvd<=toDateTime('${toDate.format(typings_1.DATABASE_DATE_FORMAT)}') `);\n    }\n    if (username) {\n        whereParts.push(` username='${username}' `);\n    }\n    if (dstPort) {\n        whereParts.push(` dstPort='${dstPort}' `);\n    }\n    if (srcPort) {\n        whereParts.push(` srcPort='${srcPort}' `);\n    }\n    if (businessId) {\n        whereParts.push(` businessId='${businessId}' `);\n    }\n    if (departments && departments.length > 0) {\n        const departmentQueries = [];\n        for (const departmentId of departments) {\n            departmentQueries.push(` departmentId='${departmentId}' `);\n        }\n        whereParts.push(` (${departmentQueries.join(' OR ')}) `);\n    }\n    if (srcAddress) {\n        whereParts.push(` ( srcIp='${srcAddress}' OR nextHop='${srcAddress}' ) `);\n    }\n    if (dstAddress) {\n        whereParts.push(` ( dstIp='${dstAddress}' OR nextHop='${dstAddress}' ) `);\n    }\n    if (whereParts.length > 0) {\n        mainQuery = `${mainQuery} WHERE  ${whereParts.join(' AND ')}`;\n    }\n    if (!count && limit >= 0 && skip >= 0) {\n        mainQuery = `${mainQuery} LIMIT ${limit}  OFFSET ${skip} `;\n    }\n    log.debug(netflowReportRequestTask);\n    return mainQuery;\n};\nconst query = async (type, netflowReportRequestTask) => {\n    const mainQuery = await createNetflowQuery(netflowReportRequestTask, false);\n    const countQuery = await createNetflowQuery(netflowReportRequestTask, true);\n    log.debug({ countQuery });\n    const countResult = await clickClient_1.executeClickQuery(countQuery);\n    const { rows, columns } = await clickClient_1.executeClickQuery(mainQuery);\n    let data;\n    if (type === 'json') {\n        data = rows.map((row) => {\n            return rowValueToJson(columns, row);\n        });\n    }\n    return {\n        data,\n        columns,\n        size: countResult.rows && countResult.rows[0] && countResult.rows[0][0],\n    };\n};\nconst formatJson = (data) => {\n    return data.map((row) => {\n        if (row.timeRecvd) {\n            row.jalaliDate = toJalaliDate(row.timeRecvd);\n            row.gregorianDate = toGregorianDate(row.timeRecvd);\n        }\n        if (row.proto) {\n            row.protocol = toProtocolString(row.proto);\n        }\n        return row;\n    });\n};\nconst rowValueToJson = (columns, row) => {\n    let i = 0;\n    const jsonRow = {};\n    for (const value of row) {\n        jsonRow[columns[i].name] = value;\n        i++;\n    }\n    return jsonRow;\n};\nconst toJalaliDate = (date) => {\n    return moment_jalaali_1.default(moment_1.default.tz(date, '').tz(typings_1.LOCAL_TIME_ZONE)).format(typings_1.REPORT_PERSIAN_DATE_FORMAT);\n};\nconst toGregorianDate = (date) => {\n    return moment_1.default\n        .tz(date, '')\n        .tz(typings_1.LOCAL_TIME_ZONE)\n        .format(typings_1.REPORT_GREGORIAN_DATE_FORMAT);\n};\nconst toProtocolString = (protocol) => {\n    let protocolString = '';\n    if (protocol === 6) {\n        protocolString = typings_1.PROTOCOLS.TCP;\n    }\n    if (protocol === 17) {\n        protocolString = typings_1.PROTOCOLS.UPD;\n    }\n    return protocolString;\n};\nexports.default = {\n    query,\n    formatJson,\n};\n\n\n//# sourceURL=file:////Users/payamyousefi/projects/hotspotplus/log-worker/src/modules/netflow.ts");

/***/ }),

/***/ "./modules/webproxy.ts":
/*!*****************************!*\
  !*** ./modules/webproxy.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst logger_1 = __importDefault(__webpack_require__(/*! ../utils/logger */ \"./utils/logger.ts\"));\nconst moment_1 = __importDefault(__webpack_require__(/*! moment */ \"moment\"));\nconst moment_jalaali_1 = __importDefault(__webpack_require__(/*! moment-jalaali */ \"moment-jalaali\"));\nconst typings_1 = __webpack_require__(/*! ../typings */ \"./typings/index.ts\");\nconst clickClient_1 = __webpack_require__(/*! ../utils/clickClient */ \"./utils/clickClient.ts\");\nconst log = logger_1.default.createLogger();\nconst query = async (type, webproxyReportRequestTask) => {\n    const mainQuery = await createWebproxyQuery(webproxyReportRequestTask, false);\n    const countQuery = await createWebproxyQuery(webproxyReportRequestTask, true);\n    log.debug({ countQuery });\n    const countResult = await clickClient_1.executeClickQuery(countQuery);\n    const { rows, columns } = await clickClient_1.executeClickQuery(mainQuery);\n    let data;\n    if (type === 'json' && rows) {\n        data = rows.map((row) => {\n            return rowValueToJson(columns, row);\n        });\n    }\n    return {\n        data,\n        columns,\n        size: countResult.rows && countResult.rows[0] && countResult.rows[0][0],\n    };\n};\nconst rowValueToJson = (columns, row) => {\n    let i = 0;\n    const jsonRow = {};\n    for (const value of row) {\n        jsonRow[columns[i].name] = value;\n        i++;\n    }\n    return jsonRow;\n};\nconst toJalaliDate = (date) => {\n    return moment_jalaali_1.default(moment_1.default.tz(date, '').tz(typings_1.LOCAL_TIME_ZONE)).format(typings_1.REPORT_PERSIAN_DATE_FORMAT);\n};\nconst toGregorianDate = (date) => {\n    return moment_1.default\n        .tz(date, '')\n        .tz(typings_1.LOCAL_TIME_ZONE)\n        .format(typings_1.REPORT_GREGORIAN_DATE_FORMAT);\n};\nconst formatJson = (data) => {\n    return data.map((row) => {\n        if (row.receivedAt) {\n            row.jalaliDate = toJalaliDate(row.timeRecvd);\n            row.gregorianDate = toGregorianDate(row.timeRecvd);\n        }\n        return row;\n    });\n};\nconst createWebproxyQuery = (webproxyReportRequestTask, count) => {\n    const { departments, fromDate, toDate, businessId, limit, skip, domain, url, username, } = webproxyReportRequestTask;\n    let mainQuery;\n    if (count) {\n        mainQuery = `SELECT toInt32(count (*)) FROM hotspotplus.Session JOIN hotspotplus.WebProxy  ON Session.nasIp=WebProxy.nasIp \n  AND toStartOfInterval(Session.creationDate, INTERVAL 5 minute)=toStartOfInterval(WebProxy.receivedAt, INTERVAL 5 minute )`;\n    }\n    else {\n        mainQuery = `SELECT businessId,departmentId,memberId,nasIp,username,domain,method,url,nasIp,memberIp, receivedAt FROM hotspotplus.Session JOIN hotspotplus.WebProxy  ON Session.nasIp=WebProxy.nasIp \n  AND toStartOfInterval(Session.creationDate, INTERVAL 5 minute)=toStartOfInterval(WebProxy.receivedAt, INTERVAL 5 minute )`;\n    }\n    const whereParts = [' Session.framedIpAddress=WebProxy.memberIp '];\n    if (fromDate) {\n        whereParts.push(` receivedAt>=toDateTime('${fromDate.format(typings_1.DATABASE_DATE_FORMAT)}') `);\n    }\n    if (toDate) {\n        whereParts.push(` receivedAt<=toDateTime('${toDate.format(typings_1.DATABASE_DATE_FORMAT)}') `);\n    }\n    if (username) {\n        whereParts.push(` username='${username}' `);\n    }\n    if (domain) {\n        whereParts.push(` domain like '%${domain}%' `);\n    }\n    if (url) {\n        whereParts.push(` url like '%${url}%' `);\n    }\n    if (businessId) {\n        whereParts.push(` businessId='${businessId}' `);\n    }\n    if (departments && departments.length > 0) {\n        const departmentsIdQueries = [];\n        for (const department of departments) {\n            departmentsIdQueries.push(` nasId='${department}' `);\n        }\n        whereParts.push(` (${departmentsIdQueries.join(' OR ')}) `);\n    }\n    if (whereParts.length > 0) {\n        mainQuery = `${mainQuery} WHERE  ${whereParts.join(' AND ')}`;\n    }\n    if (!count && limit >= 0 && skip >= 0) {\n        mainQuery = `${mainQuery} LIMIT ${limit}  OFFSET ${skip} `;\n    }\n    return mainQuery;\n};\nexports.default = {\n    query,\n    formatJson,\n};\n\n\n//# sourceURL=file:////Users/payamyousefi/projects/hotspotplus/log-worker/src/modules/webproxy.ts");

/***/ }),

/***/ "./reportEngine/csv.ts":
/*!*****************************!*\
  !*** ./reportEngine/csv.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\nconst logger_1 = __webpack_require__(/*! ../utils/logger */ \"./utils/logger.ts\");\nconst util_1 = __importDefault(__webpack_require__(/*! util */ \"util\"));\nconst { AsyncParser } = __webpack_require__(/*! json2csv */ \"json2csv\");\nconst log = logger_1.createLogger();\nconst writeFile = util_1.default.promisify(fs.writeFile);\nconst readFile = util_1.default.promisify(fs.readFile);\nconst closeFile = util_1.default.promisify(fs.close);\nconst unlink = util_1.default.promisify(fs.unlink);\nconst render = async (reportConfig, data) => {\n    return new Promise((resolve, reject) => {\n        const config = reportConfig;\n        const transformOpts = { highWaterMark: 8192 };\n        const asyncParser = new AsyncParser({ fields: config.headers }, transformOpts);\n        let csv = '';\n        asyncParser.processor\n            .on('data', (chunk) => (csv += chunk.toString()))\n            .on('end', () => {\n            log.debug('csv parser done');\n            resolve(csv);\n        })\n            .on('error', (error) => {\n            log.error('csv parser error', error);\n            reject(error);\n        });\n        const dataList = data;\n        for (const row of dataList) {\n            asyncParser.input.push(JSON.stringify(row));\n        }\n        log.debug('all rows send to csv parser');\n        asyncParser.input.push(null); // Sending `null` to a stream signal that no more data is expected and ends it.\n    });\n};\nexports.default = render;\n\n\n//# sourceURL=file:////Users/payamyousefi/projects/hotspotplus/log-worker/src/reportEngine/csv.ts");

/***/ }),

/***/ "./reportEngine/excel.ts":
/*!*******************************!*\
  !*** ./reportEngine/excel.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\nconst jsreport = __webpack_require__(/*! jsreport-core */ \"jsreport-core\")();\nconst logger_1 = __webpack_require__(/*! ../utils/logger */ \"./utils/logger.ts\");\nconst util_1 = __importDefault(__webpack_require__(/*! util */ \"util\"));\nconst log = logger_1.createLogger();\njsreport.use(__webpack_require__(/*! jsreport-xlsx */ \"jsreport-xlsx\")());\njsreport.use(__webpack_require__(/*! jsreport-handlebars */ \"jsreport-handlebars\")());\njsreport.init();\nconst writeFile = util_1.default.promisify(fs.writeFile);\nconst readFile = util_1.default.promisify(fs.readFile);\nconst closeFile = util_1.default.promisify(fs.close);\nconst unlink = util_1.default.promisify(fs.unlink);\nconst render = async (reportConfig, data) => {\n    const { templateName, helperName } = reportConfig;\n    const template = await readFile(`${process.env.REPORT_TEMPLATES_PAHT}/${templateName}`);\n    const helpers = await readFile(`${process.env.REPORT_TEMPLATES_PAHT}/${helperName}`);\n    const report = await jsreport.render({\n        template: {\n            recipe: 'xlsx',\n            engine: 'handlebars',\n            content: helpers.toString('utf8'),\n            xlsxTemplate: {\n                content: template.toString('base64'),\n            },\n        },\n        templatingEngines: {\n            timeout: 80000,\n        },\n        data,\n    });\n    return report;\n};\nexports.default = render;\n\n\n//# sourceURL=file:////Users/payamyousefi/projects/hotspotplus/log-worker/src/reportEngine/excel.ts");

/***/ }),

/***/ "./reportEngine/index.ts":
/*!*******************************!*\
  !*** ./reportEngine/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst excel_1 = __importDefault(__webpack_require__(/*! ./excel */ \"./reportEngine/excel.ts\"));\nconst csv_1 = __importDefault(__webpack_require__(/*! ./csv */ \"./reportEngine/csv.ts\"));\nconst render = async (reportConfig, data) => {\n    switch (reportConfig.output) {\n        case \"excel\" /* EXCEL */:\n            return excel_1.default(reportConfig, data);\n        case \"csv\" /* CSV */:\n            return csv_1.default(reportConfig, data);\n        default:\n            throw new Error('unknown report type');\n    }\n};\nexports.default = render;\n\n\n//# sourceURL=file:////Users/payamyousefi/projects/hotspotplus/log-worker/src/reportEngine/index.ts");

/***/ }),

/***/ "./reportEngine/reportTypes.ts":
/*!*************************************!*\
  !*** ./reportEngine/reportTypes.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typings_1 = __webpack_require__(/*! ../typings */ \"./typings/index.ts\");\nconst excelNetflow = {\n    name: 'Connections',\n    helperName: 'netflowReportHelper.txt',\n    fileMimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',\n    fileSuffix: 'xlsx',\n    templateName: 'netflowReportTemplate.xlsx',\n    output: \"excel\" /* EXCEL */,\n};\nconst csvNetflow = {\n    name: 'Connections',\n    fileMimeType: 'text/csv',\n    fileSuffix: 'csv',\n    headers: [\n        {\n            label: 'Router IP',\n            value: 'routerAddr',\n        },\n        {\n            label: 'Username',\n            value: 'username',\n        },\n        {\n            label: 'Src IP',\n            value: 'srcIp',\n        },\n        {\n            label: 'Dst IP',\n            value: 'dstIp',\n        },\n        {\n            label: 'Dst Port',\n            value: 'dstPort',\n        },\n        {\n            label: 'Src Port',\n            value: 'srcPort',\n        },\n        {\n            label: 'HTTP Method',\n            value: 'method',\n        },\n        {\n            label: 'URL',\n            value: 'url',\n        },\n        {\n            label: 'Member IP',\n            value: 'memberIp',\n        },\n        {\n            label: 'Jalali Date',\n            value: 'jalaliDate',\n        },\n        {\n            label: 'Date',\n            value: 'gregorianDate',\n        },\n    ],\n    output: \"csv\" /* CSV */,\n};\nconst excelWebproxy = {\n    name: 'Web Proxy',\n    helperName: 'webproxyReportHelper.txt',\n    templateName: 'webproxyReportTemplate.xlsx',\n    fileMimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',\n    fileSuffix: 'xlsx',\n    output: \"excel\" /* EXCEL */,\n};\nconst csvWebproxy = {\n    name: 'Web Proxy',\n    fileMimeType: 'text/csv',\n    fileSuffix: 'csv',\n    headers: [\n        {\n            label: 'Router IP',\n            value: 'nasIp',\n        },\n        {\n            label: 'Username',\n            value: 'username',\n        },\n        {\n            label: 'Domain',\n            value: 'domain',\n        },\n        {\n            label: 'HTTP Method',\n            value: 'method',\n        },\n        {\n            label: 'URL',\n            value: 'url',\n        },\n        {\n            label: 'Member IP',\n            value: 'memberIp',\n        },\n        {\n            label: 'Jalali Date',\n            value: 'jalaliDate',\n        },\n        {\n            label: 'Date',\n            value: 'gregorianDate',\n        },\n    ],\n    output: \"csv\" /* CSV */,\n};\nconst excelDns = {\n    name: 'DNS',\n    helperName: 'dnsReportHelper.txt',\n    templateName: 'dnsReportTemplate.xlsx',\n    fileMimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',\n    fileSuffix: 'xlsx',\n    output: \"excel\" /* EXCEL */,\n};\nconst csvDns = {\n    name: 'DNS',\n    headers: [\n        {\n            label: 'Router IP',\n            value: 'nasIp',\n        },\n        {\n            label: 'Username',\n            value: 'username',\n        },\n        {\n            label: 'Domain',\n            value: 'domain',\n        },\n        {\n            label: 'Jalali Date',\n            value: 'jalaliDate',\n        },\n        {\n            label: 'Date',\n            value: 'gregorianDate',\n        },\n    ],\n    fileMimeType: 'text/csv',\n    fileSuffix: 'csv',\n    output: \"csv\" /* CSV */,\n};\nconst getReportConfig = (output, reportType) => {\n    if (output === \"excel\" /* EXCEL */) {\n        switch (reportType) {\n            case typings_1.REPORT_TYPE.DNS:\n                return excelDns;\n            case typings_1.REPORT_TYPE.NETFLOW:\n                return excelNetflow;\n            case typings_1.REPORT_TYPE.WEBPROXY:\n                return excelWebproxy;\n            default:\n                throw new Error('invalid report type');\n        }\n    }\n    else if (output === \"csv\" /* CSV */) {\n        switch (reportType) {\n            case typings_1.REPORT_TYPE.DNS:\n                return csvDns;\n            case typings_1.REPORT_TYPE.NETFLOW:\n                return csvNetflow;\n            case typings_1.REPORT_TYPE.WEBPROXY:\n                return csvWebproxy;\n            default:\n                throw new Error('invalid report type');\n        }\n    }\n    else {\n        throw new Error('invalid report output');\n    }\n};\nexports.getReportConfig = getReportConfig;\n\n\n//# sourceURL=file:////Users/payamyousefi/projects/hotspotplus/log-worker/src/reportEngine/reportTypes.ts");

/***/ }),

/***/ "./routes/index.ts":
/*!*************************!*\
  !*** ./routes/index.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst express_promise_router_1 = __importDefault(__webpack_require__(/*! express-promise-router */ \"express-promise-router\"));\nconst controllers_1 = __importDefault(__webpack_require__(/*! ../controllers */ \"./controllers/index.ts\"));\nconst router = express_promise_router_1.default();\nrouter.get('/health', controllers_1.default.health);\nrouter.get('/api/netflow/search', controllers_1.default.searchNetflow);\nrouter.get('/api/dns/search', controllers_1.default.searchDns);\nrouter.get('/api/webproxy/search', controllers_1.default.searchWebproxy);\nexports.default = router;\n\n\n//# sourceURL=file:////Users/payamyousefi/projects/hotspotplus/log-worker/src/routes/index.ts");

/***/ }),

/***/ "./typings/index.ts":
/*!**************************!*\
  !*** ./typings/index.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.LOGGER_TIME_ZONE = '';\nexports.LOCAL_TIME_ZONE = 'Asia/Tehran';\nexports.DATABASE_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';\nexports.REPORT_GREGORIAN_DATE_FORMAT = 'YYYY/MM/DD HH:mm';\nexports.REPORT_PERSIAN_DATE_FORMAT = 'jYYYY/jM/jD HH:MM';\nvar REPORT_TYPE;\n(function (REPORT_TYPE) {\n    REPORT_TYPE[\"NETFLOW\"] = \"netflow\";\n    REPORT_TYPE[\"WEBPROXY\"] = \"webproxy\";\n    REPORT_TYPE[\"DNS\"] = \"dns\";\n})(REPORT_TYPE = exports.REPORT_TYPE || (exports.REPORT_TYPE = {}));\nvar PROTOCOLS;\n(function (PROTOCOLS) {\n    PROTOCOLS[\"TCP\"] = \"TCP\";\n    PROTOCOLS[\"UPD\"] = \"UDP\";\n})(PROTOCOLS = exports.PROTOCOLS || (exports.PROTOCOLS = {}));\n\n\n//# sourceURL=file:////Users/payamyousefi/projects/hotspotplus/log-worker/src/typings/index.ts");

/***/ }),

/***/ "./utils/clickClient.ts":
/*!******************************!*\
  !*** ./utils/clickClient.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst clickhouse_1 = __importDefault(__webpack_require__(/*! @apla/clickhouse */ \"@apla/clickhouse\"));\nconst logger_1 = __webpack_require__(/*! ./logger */ \"./utils/logger.ts\");\nconst log = logger_1.createLogger();\nif (!process.env.CLICK_HOST) {\n    throw new Error('CLICK_HOST is empty');\n}\nif (!process.env.CLICK_USER) {\n    throw new Error('CLICK_USER is empty');\n}\nif (!process.env.CLICK_PASSWORD) {\n    throw new Error('CLICK_PASSWORD is empty');\n}\nconst createClickConnection = () => {\n    return new clickhouse_1.default({\n        host: process.env.CLICK_HOST,\n        port: process.env.CLICK_PORT || 8123,\n        user: process.env.CLICK_USER,\n        password: process.env.CLICK_PASSWORD,\n    });\n};\nexports.createClickConnection = createClickConnection;\nconst executeClickQuery = async (mainQuery) => {\n    return new Promise((resolve, reject) => {\n        const clickHouseClient = createClickConnection();\n        const stream = clickHouseClient.query(mainQuery);\n        let columns = [];\n        stream.on('metadata', (columnsInfo) => {\n            log.debug(`row meta:`, columnsInfo);\n            columns = columnsInfo;\n        });\n        const rows = [];\n        stream.on('data', (row) => {\n            rows.push(row);\n        });\n        stream.on('error', (error) => {\n            reject(error);\n        });\n        stream.on('end', () => {\n            resolve({ rows, columns });\n        });\n    });\n};\nexports.executeClickQuery = executeClickQuery;\n\n\n//# sourceURL=file:////Users/payamyousefi/projects/hotspotplus/log-worker/src/utils/clickClient.ts");

/***/ }),

/***/ "./utils/errorHandler.ts":
/*!*******************************!*\
  !*** ./utils/errorHandler.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst logger_1 = __importDefault(__webpack_require__(/*! ./logger */ \"./utils/logger.ts\"));\nconst log = logger_1.default.createLogger();\n// tslint:disable-next-line\nconst isDev = process.env.DEV == 'true';\nconst errorHandler = (error, req, res, next) => {\n    if (isDev) {\n        if (!error.status || error.status > 499) {\n            // tslint:disable-next-line no-console\n            console.log(error.stack);\n            log.error('Error:', error);\n            //log.error('Main Error Handler:', error.stack);\n        }\n    }\n    res.status(error.status || 500);\n    res.send({ message: error.message });\n};\nexports.default = errorHandler;\n\n\n//# sourceURL=file:////Users/payamyousefi/projects/hotspotplus/log-worker/src/utils/errorHandler.ts");

/***/ }),

/***/ "./utils/logger.ts":
/*!*************************!*\
  !*** ./utils/logger.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst bunyan_1 = __importDefault(__webpack_require__(/*! bunyan */ \"bunyan\"));\nexports.createLogger = () => {\n    const LOG_LEVEL = process.env.LOG_LEVEL || 'info';\n    const LOG_PATH = process.env.LOG_PATH || '/logs';\n    const level = LOG_LEVEL;\n    const streams = [\n        {\n            path: `${LOG_PATH}/log-worker.log`,\n        },\n    ];\n    return bunyan_1.default.createLogger({\n        name: 'log-worker',\n        streams,\n        level,\n    });\n};\nexports.default = {\n    createLogger: exports.createLogger,\n};\n\n\n//# sourceURL=file:////Users/payamyousefi/projects/hotspotplus/log-worker/src/utils/logger.ts");

/***/ }),

/***/ "@apla/clickhouse":
/*!***********************************!*\
  !*** external "@apla/clickhouse" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@apla/clickhouse\");\n\n//# sourceURL=file:///external%2520%2522@apla/clickhouse%2522");

/***/ }),

/***/ "bunyan":
/*!*************************!*\
  !*** external "bunyan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bunyan\");\n\n//# sourceURL=file:///external%2520%2522bunyan%2522");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=file:///external%2520%2522express%2522");

/***/ }),

/***/ "express-promise-router":
/*!*****************************************!*\
  !*** external "express-promise-router" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-promise-router\");\n\n//# sourceURL=file:///external%2520%2522express-promise-router%2522");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=file:///external%2520%2522fs%2522");

/***/ }),

/***/ "json2csv":
/*!***************************!*\
  !*** external "json2csv" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"json2csv\");\n\n//# sourceURL=file:///external%2520%2522json2csv%2522");

/***/ }),

/***/ "jsreport-core":
/*!********************************!*\
  !*** external "jsreport-core" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsreport-core\");\n\n//# sourceURL=file:///external%2520%2522jsreport-core%2522");

/***/ }),

/***/ "jsreport-handlebars":
/*!**************************************!*\
  !*** external "jsreport-handlebars" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsreport-handlebars\");\n\n//# sourceURL=file:///external%2520%2522jsreport-handlebars%2522");

/***/ }),

/***/ "jsreport-xlsx":
/*!********************************!*\
  !*** external "jsreport-xlsx" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsreport-xlsx\");\n\n//# sourceURL=file:///external%2520%2522jsreport-xlsx%2522");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=file:///external%2520%2522moment%2522");

/***/ }),

/***/ "moment-jalaali":
/*!*********************************!*\
  !*** external "moment-jalaali" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment-jalaali\");\n\n//# sourceURL=file:///external%2520%2522moment-jalaali%2522");

/***/ }),

/***/ "moment-timezone":
/*!**********************************!*\
  !*** external "moment-timezone" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment-timezone\");\n\n//# sourceURL=file:///external%2520%2522moment-timezone%2522");

/***/ }),

/***/ "tmp-promise":
/*!******************************!*\
  !*** external "tmp-promise" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"tmp-promise\");\n\n//# sourceURL=file:///external%2520%2522tmp-promise%2522");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"util\");\n\n//# sourceURL=file:///external%2520%2522util%2522");

/***/ })

/******/ })));