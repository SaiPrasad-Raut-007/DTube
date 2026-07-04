import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    videos: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Playlist = mongoose.model("Playlist", playlistSchema);
export default Playlist;
