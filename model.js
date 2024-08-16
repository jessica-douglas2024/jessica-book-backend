const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookTitle: { type: String, required: true },
  bookAuthor: { type: String, required: true },
  description: { type: String },
});


const bookRecord = mongoose.model("300365380-jessica", bookSchema);

module.exports = bookRecord;