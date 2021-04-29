const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  num: { type: Number, required: true },
  data: { type: [String], required: true },
  cat: { type: Boolean, required: true }, // Q obligatoire ou pas
  section: {type: String, required: true}, // A quel sous-ensemble du questionnaire appartient
  somethingElse: { type: String, required: false }
});

module.exports = mongoose.model('Question', questionSchema);