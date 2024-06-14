const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollingStationSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String },
  // Additional fields such as address, contact information, etc.
});

const PollingStation = mongoose.model('PollingStation', pollingStationSchema);

module.exports = PollingStation;
