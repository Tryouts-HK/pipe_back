import { Router } from "express";
import pollingUnitRoutes from "./polling_unit.js"
import complaintRoutes from "./complaint.js"
import resultRoutes from './result.js'
import accountRoutes from './account.js'

const router = Router();

// import other routes here
// import


// route them here;
router.use('/polling_units', pollingUnitRoutes);
router.use('/complaint', complaintRoutes);
router.use('/result', resultRoutes);
router.use('/account', accountRoutes);



export default router