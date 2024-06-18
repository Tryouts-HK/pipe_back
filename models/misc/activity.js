const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  phase: { type: Schema.Types.ObjectId, ref: 'Phase', required: true },
  // Additional fields like responsible parties, status, resources required, etc.
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
