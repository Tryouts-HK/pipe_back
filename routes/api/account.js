import express from "express";
const router = express.Router();
import {
  changeAccountRole,
  getProfileDetails,
  updateProfile,
} from "../../controllers/account.js";
import restrictResourceTo from "../../middlewares/permission.js";

import { ROLE_ENCODER } from "../../utils/constant.js";

router.post("/edit", updateProfile);
router.post(
  "/upgrade",
  // restrictResourceTo(ROLE_ENCODER.VOLUNTEER_LEAD, ROLE_ENCODER.ADMIN),

  changeAccountRole
);
router.get("/", getProfileDetails);

export default router;
