import mongoose from 'mongoose';


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
  songs: [{ title: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
}, { timestamps: true });

export const Album = mongoose.model('Album', albumSchema);