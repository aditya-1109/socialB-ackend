import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { postRoute } from "./routes/postRouter.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

config();

const app = express();

app.use(cors({
  origin: "*", 
  methods: ["GET","POST","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
    process.exit(1); 
  }
};

connectDB();

// Routes
app.use("/api/posts", postRoute);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running 🚀" });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
