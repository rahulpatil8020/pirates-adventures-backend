import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  login,
  signup,
  addAdventure,
} from "../controllers/userController.js";
const router = express.Router();

router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", login);
router.post("/signup", signup);
router.patch("/:id/addAdventure", addAdventure);

export default router;
