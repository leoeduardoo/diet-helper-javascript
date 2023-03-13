const referrenceValidator = require('mongoose-referrence-validator');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const mealSchema = Schema({
    description: String,
    ingredients: [{
        type: String
    }],
    meal_type: { type: String, enum: ['Breakfast', 'Lunch', 'Snack', 'Dinner'], required: true },
    week_day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }
});

mealSchema.plugin(referrenceValidator);

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;