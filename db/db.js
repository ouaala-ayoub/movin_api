import mongoose from "mongoose";

// Function to connect to the database
const connectDB = async () => {
  // Number of retry attempts
  const maxRetries = 5;
  // Retry delay in milliseconds
  const retryDelay = 5000;

  // Loop to attempt connection retries
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Log the attempt number
      console.log(`Attempt ${attempt} to connect to MongoDB...`);
      // Log the DB URL for debugging
      console.log(`Connecting to MongoDB at ${process.env.DB_URL}`);

      // Attempt to connect to MongoDB
      const conn = await mongoose.connect(process.env.DB_URL, {});

      // Log success message with connection host
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return; // Exit the function on successful connection
    } catch (error) {
      // Log the error message
      console.error(`Error connecting to MongoDB: ${error.message}`);

      // If this is the last attempt, exit the process with failure
      if (attempt === maxRetries) {
        console.error(
          `Failed to connect to MongoDB after ${maxRetries} attempts.`
        );
        process.exit(1);
      } else {
        // Log the retry message and delay
        console.log(`Retrying to connect in ${retryDelay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }
};

export default connectDB;
