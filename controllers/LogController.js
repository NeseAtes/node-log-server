var moment = require("moment");


var IndexAction = function(req, res, next) {
    var logArr = [];
    var connection = res.locals.connection;

    var app_name = req.query.app_name;
    var date = req.query.date;
    var log_level = req.query.log_level;


    function buildConditions()
    {
      var conditions = [];
      var values = [];

        if (typeof app_name !== 'undefined')
        {
            conditions.push("app_name like ?");
            values.push("%" + app_name + "%");
        }

        if (typeof date  !== 'undefined')
        {
            conditions.push("date ?");
            values.push(date);

        }

        if (typeof log_level !== 'undefined') 
        {
            conditions.push("log_level like ?");
            values.push("%" + log_level + "%");
        }
    
      return {
        where: conditions.length ?
                 conditions.join(' AND ') : '1',
        values: values
      };
    }
    
    var conditions = buildConditions();
    var sql = 'SELECT * FROM logs WHERE ' + conditions.where;
    
    connection.query(sql,conditions.values , function(err, logs) {
        if (err) {
            next(err);
        } else {
        for (var i in logs) {
            var log = {             
                log_id: logs[i].log_id,
                app_name: logs[i].app_name,
                date: moment(logs[i].date).format("DD.MM.YYYY"),
                description: logs[i].description,
                log_level: logs[i].log_level 
                           
        };
        logArr.push(log);
        }
        res.locals.data = {
            data: logArr
        }
        next();
        }
    });
};



var AddLog=function(req,res,next){

    var logObj = {
        app_name: req.body.app_name == "" ? null : req.body.app_name,
        date: req.body.date == "" ? null : moment(req.body.date, 'DD.MM.YYYY').format('YYYY-MM-DD'),
        description: req.body.description,
        log_level: req.body.log_level       
    };
    
    var connection = res.locals.connection;
    connection.query("Insert into logs set ?", logObj, function(err, result) {
        if (err) {
            next(err);
        } else {
            res.locals.data = {
                data: true
            };
            next();
        }
    });
};
  
module.exports.index = IndexAction;
module.exports.addlog = AddLog;






