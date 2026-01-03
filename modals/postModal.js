import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Image is required"],
      validate: {
        validator: function (value) {
          return /\.(jpg|jpeg|png|webp|gif)$/i.test(value);
        },
        message: "Only image files (jpg, jpeg, png, webp, gif) are allowed",
      },
    },

    caption: {
      type: String,
      required: [true, "Caption is required"],
      trim: true,
      maxlength: 500,
    },

    likes: {
      type: Number,
      default: 0,
      min: 0,
    },

    comments: [
      {
        text: {
          type: String,
          required: true,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
