import express from "express";
import {
  createPollingUnitResult,
  getPollingUnitResultById as getPollingUnitResultByResultId,
  getAllPollingUnitResults,
  updatePollingUnitResult as updatePollingUnitResultByResultId,
  deletePollingUnitResult as deletePollingUnitByResultId,
  getAnUntaggedResult,
  getATaggedResult,
  getAllPollingUnitResultsByStates,
  getAllPollingUnitResultsByLGA,
  getAllPollingUnitResultsByWard,
} from "../../controllers/result.js";
import restrictResourceTo from "../../middlewares/permission.js";
import { ROLE_ENCODER } from "../../utils/constant.js";

const router = express.Router();

// Route to create a new polling unit result
router.post("/", restrictResourceTo(), createPollingUnitResult);

// Route to get all polling unit results with pagination
router.get(
  "/",
  // restrictResourceTo(ROLE_ENCODER.ADMIN),
  getAllPollingUnitResults
);

// route to get untagged result
router.get(
  "/untagged",
  // restrictResourceTo(
  //   ROLE_ENCODER.VOLUNTEER,
  //   ROLE_ENCODER.VOLUNTEER_LEAD,
  //   ROLE_ENCODER.ADMIN
  // ),
  getAnUntaggedResult
);

// route to get a tagged result
router.get(
  "/tagged",
  // restrictResourceTo(ROLE_ENCODER.VOLUNTEER_LEAD, ROLE_ENCODER.ADMIN),
  getATaggedResult
);

// Route to get a polling unit result by ID

router.get(
  "/states",
  // restrictResourceTo(ROLE_ENCODER.ADMIN),
  getAllPollingUnitResultsByStates
);

router.get(
  "/state/:stateCode",
  // restrictResourceTo(ROLE_ENCODER.ADMIN),
  getAllPollingUnitResultsByLGA
);

router.get(
  "/state/:stateCode/lga/:lgaCode",
  // restrictResourceTo(ROLE_ENCODER.ADMIN),
  getAllPollingUnitResultsByWard
);

router.get(
  "/:id",
  // restrictResourceTo(ROLE_ENCODER.VOLUNTEER, ROLE_ENCODER.ADMIN),
  getPollingUnitResultByResultId
);

// Route to update a polling unit result by ID
router.put(
  "/:id",
  // restrictResourceTo(
  //   ROLE_ENCODER.VOLUNTEER,
  //   ROLE_ENCODER.VOLUNTEER_LEAD,
  //   ROLE_ENCODER.ADMIN
  // ),
  updatePollingUnitResultByResultId
);

// Route to delete a polling unit result by ID
router.delete(
  "/:id",
  // restrictResourceTo(ROLE_ENCODER.ADMIN),
  deletePollingUnitByResultId
);

router.get(
  "/state",
  // restrictResourceTo(ROLE_ENCODER.ADMIN),
  deletePollingUnitByResultId
);

export default router;
