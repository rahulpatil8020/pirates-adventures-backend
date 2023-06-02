import express from "express";
import { getGoogleAPIKey } from "../controllers/apiKeysController.js";

const router = express.Router();

router.get("/googlemap", getGoogleAPIKey);

export default router;
