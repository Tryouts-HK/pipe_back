import express from "express";
import {
  createPollingUnitResult,
  getPollingUnitResultById,
  getAllPollingUnitResults,
  updatePollingUnitResult,
  deletePollingUnitResult,
  getAnUntaggedResult,
} from "../../controllers/result.js";
import restrictResourceTo from "../../middlewares/permission.js";
import { ROLE_ENCODER } from "../../utils/constant.js";

const router = express.Router();

// Route to create a new polling unit result
router.post(
  "/",
  restrictResourceTo(ROLE_ENCODER.ADMIN,),
  createPollingUnitResult
);

// Route to get all polling unit results with pagination
router.get("/", getAllPollingUnitResults);

router.get("/untagged", getAnUntaggedResult);

// Route to get a polling unit result by ID
router.get("/:id", getPollingUnitResultById);

// Route to update a polling unit result by ID
router.put("/:id", updatePollingUnitResult);

// Route to delete a polling unit result by ID
router.delete("/:id", deletePollingUnitResult);

export default router;
