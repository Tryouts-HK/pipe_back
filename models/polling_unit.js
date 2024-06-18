import { Schema, model } from "mongoose";

const pollingUnitSchema = new Schema({
  name: { type: String, required: true },
  location: { type: Object },
  delimitation: { type: String },
  ward_name: { type: String },
  local_government_name: { type: String },
  state_name: { type: String },
});

const PollingUnit = model('Polling_Units', pollingUnitSchema);

export default PollingUnit;