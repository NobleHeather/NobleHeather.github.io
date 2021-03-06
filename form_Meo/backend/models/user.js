const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    pseudo: {type: String, required: true, unique: true},
    mail: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    genre: { type: Number, required: false},
    age: {type: Number, required: false},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);