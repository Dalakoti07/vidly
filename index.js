// we have imported the joi and express module
const mongoose=require('mongoose');
const genres=require('./routes/genres');
const customers=require('./routes/customers');
const express = require('express');
const app = express();

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

// use port environemnt variable of the host ,if it is unavailable then use port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));