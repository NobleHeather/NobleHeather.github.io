const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
  pseudo: { type: String, required: true }, 
  section: {type: String, required: true}, 
  data: { type: [String], required: true }
});

module.exports = mongoose.model('Form', formSchema);