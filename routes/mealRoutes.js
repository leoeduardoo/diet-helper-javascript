const router = require('express').Router();
const Meal = require('../model/Meal');

router.post('/', async (req, res) => {

    const { description, ingredients } = req.body;

    const meal = { description, ingredients };

    try {
        await Meal.create(meal);
        res.status(201).json({ message: 'Meal created!' });
    } catch (error) {
        res.status(500).json({ error: error });
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

router.patch('/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const { description, ingredients } = req.body;

        const meal = { description, ingredients };

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