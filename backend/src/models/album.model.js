import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Date,
    required: true,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song", // Ensure this matches the Song model name
    },
  ],
});

const Album = mongoose.model("Album", albumSchema);

export default Album;