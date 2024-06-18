import { Schema, model } from 'mongoose';

const complaintSchema = new Schema({
  text_content: {
    type: String,
    required: true
  },
  polling_unit_code: {
    type: String,
    required: true
  },
  impact_level: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  urgency: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  video_evidence: {
    type: [
      {
        url: {
          type: String,
          required: true
        },
        description: {
          type: String
        }
      }
    ],
    default: []
  },
  audio_evidence: {
    type: [
      {
        url: {
          type: String,
          required: true
        },
        description: {
          type: String
        }
      }
    ],
    default: []
  },
  picture_evidence: {
    type: [
      {
        url: {
          type: String,
          required: true
        },
        description: {
          type: String
        }
      }
    ],
    default: []
  }
});

const Complaint = model('Complaint', complaintSchema);

export default Complaint;
