
import express from 'express';
import {
  createPollingUnitResult,
  getPollingUnitResultById,
  getAllPollingUnitResults,
  updatePollingUnitResult,
  deletePollingUnitResult
} from '../../controllers/pu_result.js';

const router = express.Router();

// Route to create a new polling unit result
router.post('/', createPollingUnitResult);


// Route to get all polling unit results with pagination
router.get('/', getAllPollingUnitResults);

// Route to get a polling unit result by ID
router.get('/:id', getPollingUnitResultById);


// Route to update a polling unit result by ID
router.put('/:id', updatePollingUnitResult);

// Route to delete a polling unit result by ID
router.delete('/:id', deletePollingUnitResult);

export default router;
