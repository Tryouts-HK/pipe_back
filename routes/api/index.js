import { Router } from "express";
import pollingUnitRoutes from "./polling_unit_route.js"

const router = Router();

// import other routes here
// import


// route them here;
router.use('/polling_units', pollingUnitRoutes);



export default router