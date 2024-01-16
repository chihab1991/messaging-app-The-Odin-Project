import asyncHandler from "express-async-handler";
import Chat from "./../models/chatModel.js";
import Message from "./../models/messageModel.js";
import mongoose from "mongoose";
import User from "../models/userModel.js";

const sendMessage = asyncHandler(async (req, res) => {
	const { firstUser, secondUser, text, from, to } = req.body;

	const [userOne, userTwo] = await Promise.all([
		User.findOne({ email: firstUser }),
		User.findOne({ email: secondUser }),
	]);

	if (userOne && userTwo) {
		const arrayId = [userOne._id, userTwo._id];
		let chat;
		let message;
		chat = await Chat.findOne({ chatters: { $all: arrayId } });
		if (!chat) {
			chat = await Chat.create({ chatters: arrayId });
		}
		message = await Message.create({ from, to, text });
		if (message) {
			chat.messages.push(message._id);
			await chat.save();
		}
		res.status(200).json({ m: "message", message });
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

const getChat = asyncHandler(async (req, res) => {
	res.send({ m: "get Chat" });
});
const setChat = asyncHandler(async (req, res) => {
	const { firstUser, secondUser } = req.body;
	const [userOne, userTwo] = await Promise.all([
		User.findOne({ email: firstUser }),
		User.findOne({ email: secondUser }),
	]);
	if (userOne && userTwo) {
		const arrayId = [userOne._id, userTwo._id];
		let chat;
		chat = await Chat.findOne({ chatters: { $all: arrayId } }).populate(
			"messages"
		);
		if (!chat) {
			chat = await Chat.create({ chatters: arrayId });
		}
		res.status(200).json({ message: "Chat", chat });
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});
export { sendMessage, getChat, setChat };
