const router = require('express').Router();
const Meal = require('../model/Meal');

router.post('/:user_id', async (req, res) => {

    const user_id = req.params.user_id;

    const { description, ingredients, meal_type, week_day } = req.body;

    const meal = new Meal({ description, ingredients, meal_type, week_day, user_id });

    try {
        await Meal.create(meal);
        res.status(201).json({ message: 'Meal created!' });
    } catch (error) {
        if (error.message === 'Meal validation failed: user_id: Invalid ID(s)') {
            res.status(422).json({ message: 'User not found!' });
        } else {
            res.status(500).json({ error: error });
        }
    }
});

router.get('/', async (req, res) => {
    try {
        const meal = await Meal.find();
        res.status(200).json(meal);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', async (req, res) => {

    const id = req.params.id;

    try {
        const meal = await Meal.findById(id);

        if (!meal) {
            res.status(422).json({ message: 'Meal not found!' });
            return;
        }

        res.status(200).json(meal);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:user_id/:week_day', async (req, res) => {

    const user_id_param = req.params.user_id;
    const week_day_param = req.params.week_day;

    try {
        const meals = await Meal
            .find().where({ user_id: user_id_param, week_day: week_day_param }, Meal);

        if (!meals) {
            res.status(422).json({ message: 'Meal(s) not found!' });
            return;
        }

        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.patch('/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const { description, ingredients, meal_type, week_day } = req.body;

        const meal = { description, ingredients, meal_type, week_day };

        const updatedMeal = await Meal.updateOne({ _id: id }, meal);

        if (updatedMeal === 0) {
            res.status(422).json({ message: 'Meal not found!' });
            return;
        }

        res.status(200).json(meal);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    const meal = await Meal.findById(id);

    if (!meal) {
        res.status(422).json({ message: 'Meal not found!' });
        return;
    }

    try {
        await meal.deleteOne({ _id: id });
        res.status(200).json('Meal deleted!');
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;