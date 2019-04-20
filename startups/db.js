const winston=require('winston');
const mongoose=require('mongoose');

module.exports=function(){
    mongoose.connect('mongodb://localhost/vidly')
    .then(()=> winston.info('connected to the mongodb database'));
    // global error handler would deal with rejections
}