import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongoose connected to MongoDB");
    });
  } catch (error) {
    console.log("something get wrong");
  }
}
