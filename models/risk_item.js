const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const riskItemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  likelihood: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  impact: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  mitigationPlan: { type: String },
  contingencyPlan: { type: String },
  riskCategory: { type: Schema.Types.ObjectId, ref: 'RiskCategory' },
  // Additional fields like responsible parties, status, etc.
});

const RiskItem = mongoose.model('RiskItem', riskItemSchema);

module.exports = RiskItem;
