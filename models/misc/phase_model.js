const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phaseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  // Additional fields like objectives, milestones, etc.
});

const Phase = mongoose.model('Phase', phaseSchema);

module.exports = Phase;
