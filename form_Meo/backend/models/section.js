const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
  nameSection: { type: String, required: true },
  pseudo: { type: String, required: true},
  NumQ_data: { type: [String], required: true },
  somethingElse: { type: String, required: false }
});

module.exports = mongoose.model('Question', sectionSchema);