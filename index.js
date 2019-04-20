const Joi = require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const express = require('express');
const app = express();

require('./startups/routes')(app);// this require returns function and we pass app to it and call that function 
require('./startups/db')();
require('./startups/logging')();
require('./startups/config')();

//error middleware, after all the routes
app.use(error);
// use port environemnt variable of the host ,if it is unavailable then use port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));