const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollingUnitSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String },
  // Additional fields such as address, contact information, etc.
});

const PollingUnit = mongoose.model('PollingUnit', pollingUnitSchema);

module.exports = PollingUnit;
