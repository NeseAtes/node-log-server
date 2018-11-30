
var IndexAction = function(req, res, next) {
    var appArr = [];
    var connection = res.locals.connection;

    connection.query("SELECT * from app_detail ", function(err, apps) {
        if (err) {
            next(err);
        } else {
            for (var i in apps){
                var app = {
                    app_id: apps[i].app_id,
                    app_ip: apps[i].app_ip,
                    hostname: apps[i].hostname,
                    version: apps[i].version
                         
                };
                appArr.push(app);
            }
            res.locals.data = {
                data: appArr
            }
            next();
        }
    });   
};
module.exports.index = IndexAction;