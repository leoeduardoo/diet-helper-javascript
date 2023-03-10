const mongoose = require('mongoose');
const { Schema } = mongoose;

const mealSchema = Schema({
    description: String,
    ingredients: [{
        type: String
    }]
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;