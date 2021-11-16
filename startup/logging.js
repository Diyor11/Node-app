require('express-async-errors')
require('winston-mongodb')

module.exports = (winston) => {
    winston.add(new winston.transports.Console())
    winston.add(new winston.transports.File({ filename: 'log/logs.log', level: 'error' }))
    winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/first-logs' ,level: 'info'}))
    winston.exceptions.handle(new winston.transports.Console(), new winston.transports.File({filename: 'log/logs.log', level: 'error'}))
    process.on('unhandledRejection', e => {
        throw e;
    })
}