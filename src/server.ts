import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected");
    app.listen(PORT, () => {
      console.log(` Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" DB connection failed:", err);
  });
