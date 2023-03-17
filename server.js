require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const mealRoutes = require('./routes/mealRoutes');
app.use('/meal', mealRoutes);

const nutritionRoutes = require('./routes/nutritionRoutes');
app.use('/nutrition', nutritionRoutes);

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@diet-helper.fhqf8em.mongodb.net/diet-helper?retryWrites=true&w=majority`)
    .then(() => {
        console.log('MongoDB connection stablished!');
        app.listen(3000);
    })
    .catch((err) => console.log(err));
