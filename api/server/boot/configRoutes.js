/**
 * Created by payamyousefi on 5/11/15.
 */
const logger = require('../modules/logger');
const log = logger.createLogger();
const utility = require('../modules/utility');
const url = require('url');
const underscore = require('underscore');
const config = require('../modules/config');
module.exports = function(app) {
  const router = app.loopback.Router();

  /* router.post('/api/config/systemConfig', function(req, res) {
    const SystemConfig = app.models.SystemConfig;
    SystemConfig.getConfig()
      .then(function(systemConfig) {
        systemConfig.version = config.VERSION;
        systemConfig.dropBoxAppKey = null;
        systemConfig.dropBoxAppSecret = null;
        systemConfig.sentryReleaseToken = config.SENTRY_DASHBOARD_RELEASE_TOKEN;
        systemConfig.sentryUrl =
          config.SENTRY_DASHBOARD_URL || config.DEFAULT_SENTRY_URL;
        systemConfig.enableSentry = config.ENABLE_DASHBOARD_SENTRY;
        return res.status(200).json(systemConfig);
      })
      .fail(function(error) {
        log.error(error);
        return res.status(500).json({error: 'failed to load config'});
      });
  }); */

  router.post('/api/radius/loadThemeConfig', function(req, res) {
    const Nas = app.models.Nas;
    const Member = app.models.Member;
    log.debug(req.body);
    try {
      if (!req.body || !req.body.url) {
        return res.status(500).json({error: 'url parameters is required'});
      }
      let urlParameter = req.body.url;
      urlParameter = urlParameter.replace('#!/', '');
      const parsedUrl = url.parse(urlParameter, true);
      log.debug(parsedUrl);
      if (
        !parsedUrl.query.loginurl &&
        !parsedUrl.query.actionurl &&
        !parsedUrl.query.nasId &&
        !parsedUrl.query.nasid &&
        !parsedUrl.query.staticnasid
      ) {
        return res.status(500).json({error: 'Invalid parameters'});
      }
      let called, loginurl;
      let responseQuery = {};
      if (parsedUrl.query && parsedUrl.query.loginurl) {
        // Handle coova chilli routers
        const parsedLoginUrl = url.parse(parsedUrl.query.loginurl, true);
        responseQuery = parsedLoginUrl.query;
        called = parsedLoginUrl.query.called;
        responseQuery.nasId = utility.trimMac(called);
        responseQuery.signInUrl =
          'http://' +
          responseQuery.uamip +
          ':' +
          responseQuery.uamport +
          '/login';
      } else if (parsedUrl.query && parsedUrl.query.actionurl) {
        // Handle EnGenius routers
        const parsedActionUrl = url.parse(parsedUrl.query.actionurl, true);
        responseQuery = parsedActionUrl.query;
        responseQuery.nasId = parsedUrl.query.staticnasid;
        responseQuery.uamip = parsedActionUrl.hostname;
        responseQuery.uamport = '4990';
        responseQuery.signInUrl =
          'http://' +
          responseQuery.uamip +
          ':' +
          responseQuery.uamport +
          '/www/login.chi';
      } else if (parsedUrl.query.staticnasid) {
        // Handle EnGenius after login
        responseQuery.uamip = parsedUrl.query.uamip;
        responseQuery.uamport = parsedUrl.query.uamport;
        responseQuery.nasId = parsedUrl.query.staticnasid;
      } else if (parsedUrl.query.nasId) {
        // Handle mikrotik routers
        responseQuery = parsedUrl.query;
        responseQuery.nasId = parsedUrl.query.nasId;
        responseQuery.signInUrl = 'http://' + responseQuery.host + '/login';
      } else if (parsedUrl.query.nasid) {
        // Handle xclaim routers
        responseQuery = parsedUrl.query;
        responseQuery.nasId = parsedUrl.query.nasid;
        responseQuery.signInUrl =
          'http://' +
          responseQuery.uamip +
          ':' +
          responseQuery.uamport +
          '/login';
      } else {
        return res
          .status(500)
          .json({error: 'failed to extract required params'});
      }

      Nas.loadThemeConfigById(responseQuery.nasId, function(
        error,
        themeConfig
      ) {
        if (error) {
          log.error(error);
          return res.status(500).json(error);
        }
        responseQuery.businessId = themeConfig.businessId;
        underscore.extend(themeConfig, responseQuery);
        Member.loadMemberCredentialsByMac(
          responseQuery.mac,
          themeConfig.businessId
        )
          .then(function(credentials) {
            log.debug('credentials loaded for: ', credentials);
            if (themeConfig.enableMemberAutoLogin === true) {
              underscore.extend(themeConfig, credentials);
            }
            // log.debug ( "merged config:", themeConfig );
            return res.status(200).json(themeConfig);
          })
          .fail(function(error) {
            log.error('failed to load credentials by mac');
            return res.status(500).json(error);
          });
      });
    } catch (error) {
      log.error(error);
      return res.status(500).json(error);
    }
  });

  app.use(router);
};
