const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const observationTypeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  // Additional fields related to observation types
});

const ObservationType = mongoose.model('ObservationType', observationTypeSchema);

module.exports = ObservationType;
