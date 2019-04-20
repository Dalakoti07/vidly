const express=require('express');
const genres=require('../routes/genres');
const customers=require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rental');
const auth=require('../routes/auth');
const users=require('../routes/users');
const error=require('../middleware/error');

module.exports=function(app)
{
    app.use(express.json());
    // any route that starts with /api/genres use router genres which is router from /routes/genres.js
    app.use('/api/genres',genres);
    // any route that ........
    app.use('/api/customers',customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users',users);
    app.use('/api/auth',auth);
    app.use(error);
}