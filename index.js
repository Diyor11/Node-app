const express = require('express')
const app = express();
const winston = require('winston')

require('./startup/logging')(winston);
require('./startup/db')(winston);
require('./startup/routers')(app);
require('./startup/prod')(app);



const port = process.env.port || 8080
module.exports = app.listen(port, () => winston.info(`Server working port ${port}...`))