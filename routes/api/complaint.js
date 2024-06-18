import { Router } from 'express';
const router = Router();
import { createComplaint, 
  getAllComplaints, getComplaintById, 
  updateComplaintById, deleteComplaintById,
 } from '../../controllers/complaint.js';

// Multer middleware for file upload
import multer from 'multer';
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

// Create a new complaint with file upload
router.post('/', upload.single('file'), createComplaint);

// Get all complaints
router.get('/', getAllComplaints);

// Get a complaint by ID
router.get('/:id', getComplaintById);

// Update a complaint by ID
router.put('/:id', updateComplaintById);

// Delete a complaint by ID
router.delete('/:id', deleteComplaintById);

export default router;
