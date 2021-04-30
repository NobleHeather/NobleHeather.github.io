const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  num: { type: Number, required: true },
  data: { type: Number, required: true },
  cat: { type: Boolean, required: false }, // Q obligatoire ou pas
  section: {type: String, required: true}, // A quel sous-ensemble du questionnaire appartient
  somethingElse: { type: String, required: false } //? ici les data textes des text area ?
});

module.exports = mongoose.model('Question', questionSchema);