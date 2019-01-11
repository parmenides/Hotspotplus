import logger from '../modules/logger';

const log = logger.createLogger();

module.exports = function(app) {
  var router = app.loopback.Router();

  router.get('/api/dropBox', function(req, res) {
    var Business = app.models.Business;
    Business.dropboxSaveToken(req.query)
      .then(function(result) {
        var url = result.returnUrl;
        var code = result.code;
        return res.status(code).redirect(url);
      })
      .fail(function(error) {
        log.error('error');
        log.error(error);
        return res.json(500, { error: error });
      });
  });

  app.use(router);
};
