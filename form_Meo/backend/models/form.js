const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
  pseudo: { type: String, required: true }, 
  section: {type: String, required: true}, 
  Num_Data: { type: [], default: undefined, required: true } //? données mixtes à cause du textarea
});

module.exports = mongoose.model('Form', formSchema);