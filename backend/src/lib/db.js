import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`Connected to Mongodb ${connection}`)
  } catch (error) {
    console.log("Error connecting to mongodb", error);
    process.exit(1);  
  }
};