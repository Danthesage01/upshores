import express from "express";

import {
  register,
  login,
  logout,
  refreshToken,
  getCurrentUser,
} from "../controllers/authControllers.js";
import authenticationMiddleware from "../middleware/authentication.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);
router.route("/refresh").post(refreshToken);

router.route("/logout").post(logout);

router.route("/current-user").get(authenticationMiddleware, getCurrentUser);

export default router;
