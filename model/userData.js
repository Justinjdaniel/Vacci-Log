const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    fname: String,
    lname: String,
    email: String,
    phone: Number,
    password: String
});

module.exports = mongoose.model('user', userSchema, 'Users');