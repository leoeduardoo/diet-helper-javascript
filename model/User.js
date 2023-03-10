const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema({
    name: String,
    age: Number,
    gender: String,
    carbohydrate: Number,
    protein: Number,
    fat: Number
});

const User = mongoose.model('User', userSchema);
module.exports = User;