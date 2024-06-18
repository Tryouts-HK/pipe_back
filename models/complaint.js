import { Schema, model } from 'mongoose';

const complaintSchema = new Schema({
  text_content: {
    type: String,
    required: [true, 'Text content is required'] // Custom error message for required field
  },
  polling_unit_code: {
    type: String,
    required: [true, 'Polling unit code is required'] // Custom error message for required field
  },
  impact_level: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: [true, 'Impact level is required'], // Custom error message for required field
  },
  urgency: {
    type: String,
    enum: ['Minor', 'Normal', 'Immediate'],
    required: [true, 'Urgency is required'] // Custom error message for required field
  },
  video_evidence: {
    type: [
      {
        url: {
          type: String,
          // required: [true, 'Video evidence URL is required'] // Custom error message for required field
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
          // required: [true, 'Audio evidence URL is required'] // Custom error message for required field
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
          // required: [true, 'Picture evidence URL is required'] // Custom error message for required field
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
