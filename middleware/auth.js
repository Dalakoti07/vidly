// since we want that only authorised users (those who are having the accounts ) can edit and change the data thus we need function which can validate the logged in users, thus we take the help of middlewares
const jwt=require('jsonwebtoken');
const config=require('config');

module.exports=function (req,res,next)
{
    const token=req.header('x-auth-token');
    if(!token) res.status(401).send('Access denied. No token found');

    try{
        const decoded=jwt.verify(token,config.get('jwtPrivateKey'));
        req.user=decoded;
        next();
    }
    catch(ex)
    {
        res.status(400).send('Invalid token.');
    }
}