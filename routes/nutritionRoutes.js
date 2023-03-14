const router = require('express').Router();
const axios = require('axios');

router.get('/', async (req, res) => {

    await axios({
        method: 'POST',
        url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        headers: {
            'x-app-id': 'bc5affb2',
            'x-app-key': '234a78c2269e546bc6851e06b7334af7'
        },
        data: {
            query: req.body.query
        }
    }).then(function (response) {

        let foods = [];
        for (let index = 0; index < response.data.foods.length; index++) {
            const food = response.data.foods[index];
            const name = food.food_name;
            const quantity = food.serving_qty;
            const grams = food.serving_weight_grams;
            const carbohydrate = food.nf_total_carbohydrate;
            const protein = food.nf_protein;
            const fat = food.nf_total_fat;
            foods.push({ name, quantity, grams, carbohydrate, protein, fat });
        }

        res.status(201).json(foods);
    }).catch(function (error) {
        res.status(500).json({ error: error });
    });
});

router.get('/:user_id/:week_day', async (req, res) => {

    // gets an user_id and the user itself
    const user_id = req.params.user_id;

    let user = undefined;
    await axios({
        method: 'GET',
        url: `http://localhost:3000/user/${user_id}`
    }).then(function (response) {
        user = response.data;
    }).catch(function (error) {
        res.status(500).json({ error: error });
    });

    if (!user) {
        res.status(422).json({ message: 'User not found!' });
        return;
    }

    // gets the week_day
    const week_day = req.params.week_day;

    // gets all meals logged for this user during the day
    let meals = undefined;
    await axios({
        method: 'GET',
        url: `http://localhost:3000/meal/${user_id}/${week_day}`
    }).then(function (response) {
        meals = response.data;
    }).catch(function (error) {
        res.status(500).json({ error: error });
    });

    if (!meals) {
        res.status(422).json({ message: 'Meals not found!' });
        return;
    }

    // gets all foods nutrition details from meals
    let foods = [];
    for (let index = 0; index < meals.length; index++) {
        const meal = meals[index];

        await axios({
            method: 'GET',
            url: `http://localhost:3000/nutrition/`,
            data: {
                query: meal.description
            }
        }).then(function (response) {
            for (let index = 0; index < response.data.length; index++) {
                const food_detail = response.data[index];
                foods.push(food_detail);
            }
        }).catch(function (error) {
            res.status(500).json({ error: error });
        });
    }

    // gets the macronutrients for this user
    const user_carbohydrate = user.carbohydrate;
    const user_protein = user.protein;
    const user_fat = user.fat;

    // gets total meals' macronutrients already logged for the day
    let total_day_carbohydrate = 0;
    let total_day_protein = 0;
    let total_day_fat = 0;

    for (let index = 0; index < foods.length; index++) {
        const food = foods[index];
        const food_carbohydrate = food.carbohydrate;
        const food_protein = food.protein;
        const food_fat = food.fat;

        total_day_carbohydrate += food_carbohydrate;
        total_day_protein += food_protein;
        total_day_fat += food_fat;
    }

    // calculates the remaining calories for the day
    const remaining_carbohydrate = user_carbohydrate - total_day_carbohydrate;
    const remaining_protein = user_protein - total_day_protein;
    const remaining_fat = user_fat - total_day_fat;

    res.status(201).json({ remaining_carbohydrate, remaining_protein, remaining_fat });

});

module.exports = router;