// we have imported the joi and express module
const Joi = require('joi');
const genres=require('./routes/genres');
const express = require('express');
const app = express();
// parsing of the JSON object is not in built in javascript thus we have written line 6
app.use(express.json());
// any route that starts with /api/genres use router genres which is router from /routes/genres.js
app.use('/api/genres',genres);
// use port environemnt variable of the host ,if it is unavailable then use port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));