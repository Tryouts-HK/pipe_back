import { Schema, model } from 'mongoose';

// Custom validator function for enum values
const validateEnum = (value) => {
  const enums = ['Low', 'Medium', 'High']; // Replace with your enum values
  return enums.includes(value);
};

const complaintSchema = new Schema({
  text_content: {
    type: String,
    required: [true, 'Text content is required']
  },
  polling_unit_code: {
    type: String,
    required: [true, 'Polling unit code is required']
  },
  impact_level: {
    type: String,
    enum: {
      values: ['Low', 'Medium', 'High'],
      message: 'Invalid impact level. Acceptable Values: Low ||Medium || High',
    },
    required: [true, 'Impact level is required'],
    // validate: [validateEnum, 'Invalid impact level']
  },
  urgency: {
    type: String,
    enum: {
      values: ['Minor', 'Normal', 'Immediate'],
      message: 'Invalid urgency. Acceptable Values: Minor || Normal || Immediate'
    },
    required: [true, 'Urgency is required'],
    // validate: [validateEnum, 'Invalid urgency']
  },
  video_evidence: {
    type: [
      {
        url: {
          type: String,
          // No specific validation for URL in this example
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
          // No specific validation for URL in this example
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
          // No specific validation for URL in this example
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
