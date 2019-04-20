const winston=require('winston');
require('winston-mongodb');
require('express-async-errors');
const error=require('./middleware/error');
const config=require('config');
const Joi = require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const mongoose=require('mongoose');
const genres=require('./routes/genres');
const customers=require('./routes/customers');
const express = require('express');
const movies = require('./routes/movies');
const rentals = require('./routes/rental');
const auth=require('./routes/auth');
const users=require('./routes/users');
const app = express();

/*Winston can't log the exceptions outside the route handlers thus we use process emitters that would log message to console and then use winston to log the same message */
/*
process.on('uncaughtException',(ex)=>{
    //console.log('We got an unexception error');
    winston.error(ex.message,ex);
    process.exit(1);// exit the process
});
*/
// below line work as an alternative to line 23-17 in winston (helper function in winston ) that does the same work log the error and terminate the process
winston.handleExceptions(new winston.transports.File({filename:'uncaughtExceptions.log'}));
// this process.on (uncaughtException ) wont be able to deal with rejected promises, thus we create another process handler for that
/*process.on('unhandledRejection',(ex)=>{
    winston.error(ex.message,ex);
    process.exit(1);// exit the process
});
or we can use the winston here also*/
process.on('unhandledRejection',(ex)=>{
    throw ex;
});

winston.add(winston.transports.File,{filename:"logfile.log"});
winston.add(winston.transports.MongoDB,{db:'mongodb://localhost/vidly',level:'info'});


if(!config.get('jwtPrivateKey'))
{
    console.log('Fatal error : jwtPrivateKey is not defined ');
    process.exit(1);
}
//throw new Error('Something failed during startup');
const p=Promise.reject(new Error('Something failed misrabley'));
p.then(()=>console.log('Done'));

// .connect returns the promise and that need to be handled carefully
mongoose.connect('mongodb://localhost/vidly')
    .then(()=> console.log('connected to the mongodb database'))
    .catch(err=> console.log('could not connnect to the database'));

    // parsing of the JSON object is not in built in javascript thus we have written line 6
app.use(express.json());
// any route that starts with /api/genres use router genres which is router from /routes/genres.js
app.use('/api/genres',genres);
// any route that ........
app.use('/api/customers',customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);

//error middleware, after all the routes
app.use(error);
// use port environemnt variable of the host ,if it is unavailable then use port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));