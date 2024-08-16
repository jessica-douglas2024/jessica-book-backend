const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const URI = "mongodb+srv://user1:user1@cluster0.jw9cuev.mongodb.net/BookDB";

mongoose.connect(URI);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const myRouter = require('./route');


app.use('/api/v1/book', myRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});