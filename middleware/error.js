const winston=require('winston');

module.exports=function(err,req,res,next){
    winston.error(err.message,err);
    // this is function is responsible for handling all the error that occur during request, thus we need to do something else to handle error outside the routes
    // there are the logging levels
    //err
    //warn
    //info
    //verbose
    //debug
    //silly

    res.status(500).send('something failed ');// 500 means internal server error
}