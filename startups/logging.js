require('express-async-errors');
const winston=require('winston');
require('winston-mongodb');

module.exports=function()
{
    winston.handleExceptions(
        // we saying that we want to to use two transport methods to log the errors, one in window terminal and another on file system
        new winston.transports.Console({colorize:true,prettyPrint:true}),
        new winston.transports.File({filename:'uncaughtExceptions.log'}));
    process.on('unhandledRejection',(ex)=>{
        throw ex;
    });

    winston.add(winston.transports.File,{filename:"logfile.log"});
    winston.add(winston.transports.MongoDB,{db:'mongodb://localhost/vidly',level:'info'});

}