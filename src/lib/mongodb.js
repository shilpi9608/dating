import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "";

// Stable API client options, with additional options for URL parsing and topology management.
const clientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

async function run() {
  try {
    // Connect to MongoDB using the provided URI and options.
    await mongoose.connect(uri, clientOptions);

    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  } finally {
    // Disconnect from MongoDB after the test.
    await mongoose.disconnect();
  }
}

export default run;
