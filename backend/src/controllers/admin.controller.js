import Song  from "../models/song.model.js";
import  Album  from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// helper function to upload files to Cloudinary
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });

    return result.secure_url; // return the secure URL of the uploaded file
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

export const createSong = async (req, res) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "No file uploaded" });
    } 

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    // upload the files to Cloudinary
    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    // craete a new song object
    const song = new Song({
      artist,
      title,
      audioUrl,
      imageUrl,
      duration, 
      albumId: albumId || null,
    })

    await song.save();

    // if the song is part of an album, add it to the album's songs array
    if (albumId){
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    res.status(201).json({
      message: "Song created successfully",
      song,
    });

  } catch (error) {
    console.error("Error creating song:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    // if song belogs to an album, remove it from the album's songs array
    if(song.albumId){
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    // delete the song from the database
    await Song.findByIdAndDelete(id);

    res.status(200).json({
      message: "Song deleted successfully",
    });
  } catch (error) {
    next(error);
    console.error("Error deleting song:", error);
  }
};