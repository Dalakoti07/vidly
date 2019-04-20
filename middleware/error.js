module.exports=function(err,req,res,next){
    // log exception
    res.status(500).send('something went wrong ');// 500 means internal server error
}