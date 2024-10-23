import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env.DB_URL);
    const conn = await mongoose.connect(process.env.DB_URL, {});

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
