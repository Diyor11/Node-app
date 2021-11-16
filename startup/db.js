const mongoose = require('mongoose')

module.exports = async (winston) => {
        await mongoose.connect('mongodb://localhost/first', { useUnifiedTopology: true }).then(() => winston.debug('Mongodb connect...'))
}