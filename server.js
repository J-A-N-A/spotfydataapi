const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const mongoString = process.env.MONGODB_URI;
const PORT=process.env.PORT || 5000;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('mongodb database Connected successfully');
})
const app = express();
app.use(cors())
app.use(express.json());

const routes = require('./routes/routes');

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})