/**
 * Created by hamidehnouri on 9/21/2016 AD.
 */

const Q = require('q');
const needle = require('needle');
const logger = require('./logger');
const config = require('./config');
const log = logger.createLogger();
const utility = require('./utility');

const loginToConfigServer = (module.exports.loginToApi = module.exports.loginToConfigServer = function(
  configServerUrl,
  username,
  password
) {
  return Q.Promise(function(resolve, reject) {
    needle.post(
      configServerUrl,
      {
        username: username,
        password: password,
      },
      {json: true},
      function(error, response, body) {
        if (error) {
          log.error('Error: ', error);
          return reject(error);
        }
        log.debug('Auth Login:', response.statusCode);
        if (response.statusCode !== 200) {
          return reject(body);
        }
        const accessToken = body.id;
        return resolve({token: accessToken, userId: body.userId});
      }
    );
  });
});

module.exports.loginToLicenseServer = function(CONFIG_SERVER_LOGIN_URL) {
  log.debug('@loginToLicenseServer');
  return Q.Promise(function(resolve, reject) {
    utility
      .getSystemUuid(config.SYSTEM_ID_PATH)
      .then(function(systemUuid) {
        if (!systemUuid) {
          return resolve({});
        }
        log.info(systemUuid);
        loginToConfigServer(
          CONFIG_SERVER_LOGIN_URL,
          systemUuid,
          config.PASSWORD_PREFIX + utility.md5(systemUuid)
        )
          .then(function(authResult) {
            const token = authResult.token;
            const userId = authResult.userId;
            log.debug('@loginToLicenseServer', authResult);
            return resolve({token: token, userId: userId});
          })
          .fail(function(error) {
            log.error(error);
            return reject(error);
          });
      })
      .fail(function(error) {
        log.error(error);
        return reject(new Error('failed to load systemid'));
      });
  });
};
/*

var login = (module.exports.login = function(username, password, ttlMs) {
  return Q.Promise(function(resolve, reject) {
    needle.post(
      LOGIN_REST_API,
      {
        username: username,
        password: password
      },
      { json: true },
      function(error, response) {
        if (error) {
          log.error('Error: ', error);
          return reject(error);
        }
        log.debug('Auth Login:', response.statusCode);
        log.debug(response.body);
        var accessToken = response.body.id;
        if (ttlMs) {
          setTimeout(function() {
            logout(accessToken);
          }, ttlMs);
        }
        return resolve(accessToken);
      }
    );
  });
});

var logout = (module.exports.logout = function(accessToken) {
  return Q.Promise(function(resolve, reject) {
    if (!accessToken) {
      return reject('accessToken can not be empty');
    }
    needle.post(LOGOUT_REST_API.replace('{0}', accessToken), function(
      error,
      response
    ) {
      if (error) {
        log.error('logged out failed: ', error);
        return reject(error);
      }
      log.debug('logged out ');
      return resolve();
    });
  });
});
*/
