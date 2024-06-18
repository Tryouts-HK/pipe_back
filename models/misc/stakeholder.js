const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stakeholderSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String }, // Role can be election official, observer, public, etc.
  // Additional fields such as contact information, organization, etc.
});

const Stakeholder = mongoose.model('Stakeholder', stakeholderSchema);

module.exports = Stakeholder;
