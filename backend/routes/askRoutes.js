import express from "express";
import { askQuestion } from "../controllers/askController.js";
import { askLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();
router.post("/", askLimiter, askQuestion);

export default router;
