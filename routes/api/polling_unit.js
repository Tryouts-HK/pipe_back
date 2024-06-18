import express from 'express'
import { getAllPollingUnits, getPollingUnitById } from '../../controllers/polling_unit.js';
const router = express.Router();

router.route("/").get(getAllPollingUnits); //TODO;
router.route("/:delimiter").get(getPollingUnitById);



export default router;