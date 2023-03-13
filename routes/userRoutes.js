const router = require('express').Router();
const User = require('../model/User');

router.post('/', async (req, res) => {

    const { name, age, gender, carbohydrate, protein, fat } = req.body;

    const user = { name, age, gender, carbohydrate, protein, fat };

    try {
        await User.create(user);
        res.status(201).json({ message: 'User created!' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/', async (req, res) => {
    try {
        const people = await User.find();
        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', async (req, res) => {

    const id = req.params.id;

    try {
        const user = await User.findById(id);

        if (!user) {
            res.status(422).json({ message: 'User not found!' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.patch('/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const { name, age, gender, carbohydrate, protein, fat } = req.body;

        const user = { name, age, gender, carbohydrate, protein, fat };

        const updatedUser = await User.updateOne({ _id: id }, user);

        if (updatedUser === 0) {
            res.status(422).json({ message: 'User not found!' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
        res.status(422).json({ message: 'User not found!' });
        return;
    }

    try {
        await User.deleteOne({ _id: id });
        res.status(200).json('User deleted!');
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

module.exports = router;