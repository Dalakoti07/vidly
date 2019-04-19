module.exports=function(req,res,next){
    //401 unauthorised and 403 forbidden
    if(!req.user.isAdmin) return res.status(403).send('Acess denied');
    next();
}