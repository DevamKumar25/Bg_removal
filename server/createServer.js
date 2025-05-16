import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import userRoutes from "./routes/userRoutes.js";

const createServer = async () => {
  await connectDB();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => res.send("API working"));

  app.use("/api/users", userRoutes);

  return app;
};

export default createServer;
