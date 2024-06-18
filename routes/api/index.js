import { Router } from "express";
import pollingUnitRoutes from "./polling_unit.js"
import complaintRoutes from "./complaint.js"
import puResultRoutes from './pu_result.js'

const router = Router();

// import other routes here
// import


// route them here;
router.use('/polling_units', pollingUnitRoutes);
router.use('/complaint', complaintRoutes);
router.use('/result', puResultRoutes);



export default router