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

module.exports = router;