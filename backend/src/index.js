import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";

import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import adminRouter from "./routes/admin.route.js"
import songsRouter from "./routes/songs.route.js"
import albumsRouter from "./routes/albums.route.js"
import statsRouter from "./routes/stats.route.js"
import { connectDB } from "./lib/db.js";

const app = express();
const __dirname = path.resolve(); // Get the current directory name
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json()); // Parse JSON bodies (as sent by API clients)
app.use(clerkMiddleware()) // this will add auth to request body
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, "tmp"),
  createParentPath: true,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit for file uploads
  }
}))

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/songs", songsRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/stats", statsRouter);

// error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message });
  console.error(err.stack); // Log the error stack for debugging
})

app.listen(PORT, () => {
  console.log(`Server is running om port ${PORT}`);
  connectDB();
})

// todo: socket.io implementation