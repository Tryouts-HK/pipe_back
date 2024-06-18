const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const geographicalAreaSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  // You can add more fields like coordinates, boundaries, etc. based on your needs
});

const GeographicalArea = mongoose.model('GeographicalArea', geographicalAreaSchema);

module.exports = GeographicalArea;
