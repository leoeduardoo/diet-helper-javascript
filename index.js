require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@diet-helper.fhqf8em.mongodb.net/diet-helper?retryWrites=true&w=majority`)
    .then(() => {
        console.log('MongoDB connection stablished!')
        app.listen(3000);
    })
    .catch((err) => console.log(err));