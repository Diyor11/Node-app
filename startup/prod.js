const helemt = require('helmet')
const compression = require('compression')
module.exports = (app) => {
    app.use(helemt())
    app.use(compression())
}