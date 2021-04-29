const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  num: { type: Number, required: true },
  data: { type: [String], required: true },
  somethingElse: { type: String, required: false }
});

module.exports = mongoose.model('Question', questionSchema);