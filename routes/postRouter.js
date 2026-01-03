import express from "express";
import multer from "multer";
import { createPost, getPost, updatePost } from "../controller/postController.js";

export const postRoute = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

postRoute.post("/createPost", upload.single("image"),createPost);

postRoute.get("/getPost", getPost)

postRoute.patch("/updatePost/:id", updatePost)