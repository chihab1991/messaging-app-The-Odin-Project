import express from "express";
import {
	sendMessage,
	getChat,
	setChat,
} from "../controllers/messagesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getChat).post(protect, setChat);
router.post("/send-message", protect, sendMessage);

export default router;
