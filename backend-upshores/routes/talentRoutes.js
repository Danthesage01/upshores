import express from "express";
import {
  upload,
  uploadTalentsFromExcel,
  getTalents,
  deleteAllTalents,
} from "../controllers/talentController.js";
import authorizationMiddleware from "../middleware/authorization.js";

const router = express.Router();

router.post(
  "/",
  authorizationMiddleware(["super_admin"]),
  upload.single("file"),
  uploadTalentsFromExcel
);
router.delete("/", authorizationMiddleware(["super_admin"]), deleteAllTalents);
router.get("/", getTalents);

export default router;
