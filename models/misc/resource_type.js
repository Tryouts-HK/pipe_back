const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceTypeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  // Additional fields related to resource types
});

const ResourceType = mongoose.model('ResourceType', resourceTypeSchema);

module.exports = ResourceType;
