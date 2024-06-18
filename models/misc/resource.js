const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String }, // Type can be personnel, technology, logistics, etc.
  description: { type: String },
  // Additional fields like quantity, availability, cost, etc.
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
