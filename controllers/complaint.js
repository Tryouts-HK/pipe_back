import Complaint from '../models/complaint.js';
import multer from 'multer';
import path from 'path';


// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Uploads folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // File naming scheme
  }
});

// File upload middleware with multer
const upload = multer({ storage: storage });

// Controller to handle creating a new complaint with file upload and multiple evidence
export const createComplaint = async (req, res) => {
  try {
    // Extract fields from request body
    const {
      text_content,
      polling_unit_code,
      impact_level,
      urgency
    } = req.body;

    // Extract filename from uploaded file (if any)
    const file = req.file;
    let fileUrl = null;
    if (file) {
      fileUrl = file.path; // Assuming file.path contains the path to the uploaded file
    }

    // Extract video, audio, and picture evidence from request body
    const video_evidence = JSON.parse(req.body.video_evidence || '[]');
    const audio_evidence = JSON.parse(req.body.audio_evidence || '[]');
    const picture_evidence = JSON.parse(req.body.picture_evidence || '[]');

    // Create a new complaint object
    const newComplaint = new Complaint({
      text_content,
      polling_unit_code,
      impact_level,
      urgency,
      video_evidence,
      audio_evidence,
      picture_evidence,
      fileUrl // Add fileUrl to the complaint object
    });

    // Save the complaint to the database
    await newComplaint.save();

    res.status(201).json(newComplaint);
  } catch (error) {
    console.error('Error creating complaint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to fetch all complaints
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to fetch a single complaint by ID
export const getComplaintById = async (req, res) => {
  const { id } = req.params;
  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
    res.status(200).json(complaint);
  } catch (error) {
    console.error('Error fetching complaint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to update a complaint by ID
export const updateComplaintById = async (req, res) => {
  const { id } = req.params;
  try {
    // Extract fields from request body
    const {
      text_content,
      polling_unit_code,
      impact_level,
      urgency
    } = req.body;

    // Extract video, audio, and picture evidence from request body
    const video_evidence = JSON.parse(req.body.video_evidence || '[]');
    const audio_evidence = JSON.parse(req.body.audio_evidence || '[]');
    const picture_evidence = JSON.parse(req.body.picture_evidence || '[]');

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      {
        text_content,
        polling_unit_code,
        impact_level,
        urgency,
        video_evidence,
        audio_evidence,
        picture_evidence
      },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.status(200).json(updatedComplaint);
  } catch (error) {
    console.error('Error updating complaint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to delete a complaint by ID
export const deleteComplaintById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComplaint = await Complaint.findByIdAndDelete(id);
    if (!deletedComplaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
    res.status(204).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error('Error deleting complaint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
