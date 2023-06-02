import express from "express";
import {
  getFeedPost,
  getAllFeedPosts,
  createFeedPost,
  updateFeedPost,
  deleteFeedPost,
  likeFeedPost,
} from "../controllers/feedPostController.js";
// import auth from "../middleware/auth.js";

const router = express.Router();

// Functions imported from adventureController.js are used to perform certain action when the url is hit in the backend;
router.get("/", getAllFeedPosts);
router.get("/:id", getFeedPost);
router.post("/", createFeedPost);
router.patch("/:id", updateFeedPost);
router.delete("/:id", deleteFeedPost);
router.patch("/:id/like", likeFeedPost);

export default router;
