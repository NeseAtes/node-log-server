var LogController = require("../controllers/LogController");
var BaseController = require("../controllers/BaseController");
var AppController = require("../controllers/AppController");
var HomeController = require("../controllers/HomeController");


module.exports = function(app) {

    
    app.get('/',HomeController.index);
    app.get('/api/log', BaseController.InitSession, LogController.index, BaseController.EndSession );
    app.post('/api/log/add', BaseController.InitSession, LogController.addlog, BaseController.EndSession);
    app.get('/api/apps', BaseController.InitSession, AppController.index, BaseController.EndSession );

    var errorHandler = function(err, req, res, next) {
        if (res.locals.connection) {
            res.locals.connection.release();
        }
        res.json({
            data: null,
            error: err
        });
    };
    app.use(errorHandler);
};