//import packages
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); //need dotenv for env 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetdb');

//log MongoDB queries that are executed:
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Now connected on localhost:${PORT}`))