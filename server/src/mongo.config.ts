import mongoose from "mongoose";

export default function connectDB() {
  
  mongoose
    .connect(process.env.MONGO_URl as string, {
      tls: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error from mongo.config.ts ",err);
    });
}