const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    }
}))

const validate = Joi.object({
    name: Joi.string().required().min(2)
})

module.exports = {User, validate}
