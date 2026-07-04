import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import videoRouter from "./routes/video.route.js";
import playlistsRouter from "./routes/playlist.route.js";
import commentRouter from "./routes/comment.route.js";
import adminRouter from "./routes/admin.route.js";

const MONGO_URI = process.env.MONGO_URI;
const app = express();

app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Success... Connected to Database");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}!`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the Database: ", err);
  });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/videos", videoRouter);
app.use("/api/playlists", playlistsRouter);
app.use("/api/comments", commentRouter);
app.use("/api/admin", adminRouter);
