const winston=require('winston');
const express = require('express');
const app = express();

require('./startups/routes')(app);// this require returns function and we pass app to it and call that function 
require('./startups/db')();
require('./startups/logging')();
require('./startups/config')();
require('./startups/validation')();
require('./startups/prod')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.log(`Listening on port ${port}...`));