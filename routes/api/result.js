import express from "express";
import {
  createPollingUnitResult,
  getPollingUnitResultById as getPollingUnitResultByResultId,
  getAllPollingUnitResults,
  updatePollingUnitResult as updatePollingUnitResultId,
  deletePollingUnitResult as deletePollingUnitByResultId,
  getAnUntaggedResult,
} from "../../controllers/result.js";
import restrictResourceTo from "../../middlewares/permission.js";
import { ROLE_ENCODER } from "../../utils/constant.js";

const router = express.Router();

// Route to create a new polling unit result
router.post("/", restrictResourceTo(), createPollingUnitResult);
// Route to get all polling unit results with pagination
router.get(
  "/",
  restrictResourceTo(ROLE_ENCODER.VOLUNTEER, ROLE_ENCODER.ADMIN),
  getAllPollingUnitResults
);

router.get(
  "/untagged",
  restrictResourceTo(ROLE_ENCODER.VOLUNTEER, ROLE_ENCODER.ADMIN),
  getAnUntaggedResult
);

// Route to get a polling unit result by ID
router.get(
  "/:id",
  restrictResourceTo(ROLE_ENCODER.VOLUNTEER, ROLE_ENCODER.ADMIN),
  getPollingUnitResultByResultId
);

// Route to update a polling unit result by ID
router.put(
  "/:id",
  restrictResourceTo(ROLE_ENCODER.VOLUNTEER, ROLE_ENCODER.ADMIN),
  updatePollingUnitResultId
);

// Route to delete a polling unit result by ID
router.delete(
  "/:id",
  restrictResourceTo(ROLE_ENCODER.ADMIN),
  deletePollingUnitByResultId
);

export default router;
