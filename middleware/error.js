const winston=require('winston');

module.exports=function(err,req,res,next){
    winston.error(err.message,err);
    // there are the logging levels
    //err
    //warn
    //info
    //verbose
    //debug
    //silly

    res.status(500).send('something failed ');// 500 means internal server error
}