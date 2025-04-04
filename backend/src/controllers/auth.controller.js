import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    // Check if the user already exists in the database
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      // Sign up the user if they do not exist
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }

    res.status(200).json({
      success: true,
      message: "User signed up successfully",
    });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}