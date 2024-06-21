import express from "express";
const router = express.Router();
import { getProfileDetails, updateProfile } from "../../controllers/account.js";

router.post("/edit", updateProfile);
router.get("/", getProfileDetails);

export default router;
