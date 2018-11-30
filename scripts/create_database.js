var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);


//connection.query('CREATE DATABASE ' + dbconfig.database);


connection.query('CREATE TABLE `' + dbconfig.database + '`.`logs` ( \
  `log_id` int(9) NOT NULL AUTO_INCREMENT,  \
  `app_name` varchar(100) NOT NULL, \
  `date` date NOT NULL, \
  `description` text NOT NULL, \
  `log_level` varchar(11) NOT NULL, \
  PRIMARY KEY (`log_id`), \
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8');
console.log("logs table created...");


console.log('Success: Database Created!')

connection.end();
