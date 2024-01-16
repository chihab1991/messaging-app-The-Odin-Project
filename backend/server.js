import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import messagesRoutes from "./routes/messagesRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/messages", messagesRoutes);

app.get("/", (req, res) => res.send("Server is ready."));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server started on port: ${port}`));
