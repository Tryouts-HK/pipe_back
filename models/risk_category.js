const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const riskCategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  // Additional fields related to categorizing risks
});

const RiskCategory = mongoose.model('RiskCategory', riskCategorySchema);

module.exports = RiskCategory;
