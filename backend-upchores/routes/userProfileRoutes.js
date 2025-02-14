import express from "express";
import { updateUserProfile } from "../controllers/userProfileController.js";
import authorizationMiddleware from "../middleware/authorization.js";
const router = express.Router();

router
  .route("/:userId")
  .patch(authorizationMiddleware(["company"]), updateUserProfile);

export default router;
