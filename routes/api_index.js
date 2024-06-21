import { Router } from "express";
import { ensureLoggedIn } from "../middlewares/authenticate.js";
const router = Router();

import apiRoutes from "./api/index.js";
import { jwt_scope } from "../controllers/auth.js";
import reqErrorHandler from "../middlewares/req_error_handler.js";

router.use(
  jwt_scope,
  ensureLoggedIn(), //authenticate
  apiRoutes,
  reqErrorHandler
);

router.use((req, res) =>
  res
    .status(404)
    .json({ status: "error", message: "This route is not yet defined" })
);

export default router;
