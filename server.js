//SETTING UP LIBRARIES
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose'); //For databases
const path = require('path');
require('dotenv').config(); //.env file

//IMPORTING MODELS
const User = require('./models/userModel');

//SET UP EXPRESS
const app = express();
app.use(cookieParser());
app.use(express.json());

//SETTING UP MONGOOSE 
console.log('Connecting to MongoDB');
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  error => {
    if (error) return console.error(error);

    console.log('MongoDB connection established');
  }
);

//SETTING UP ROUTES
app.use('/user', require('./routes/userRoutes'));
app.use('/todo', require('./routes/todoRoutes'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

//SETTING UP SERVER
console.log('Starting server');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
