const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objectiveSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  // Additional fields like target metrics, deadlines, etc.
});

const Objective = mongoose.model('Objective', objectiveSchema);

module.exports = Objective;
