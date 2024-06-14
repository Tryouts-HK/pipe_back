const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceAllocationSchema = new Schema({
  resourceType: { type: Schema.Types.ObjectId, ref: 'ResourceType', required: true },
  allocatedTo: { type: String, required: true }, // Can be a specific person, team, or department
  quantity: { type: Number, required: true },
  allocatedDate: { type: Date, required: true },
  // Additional fields like utilization, status, budget allocation, etc.
});

const ResourceAllocation = mongoose.model('ResourceAllocation', resourceAllocationSchema);

module.exports = ResourceAllocation;
