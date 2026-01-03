import Post from "../modals/postModal.js";

export const createPost = async (req, res) => {
  try {

    console.log(req.body)
    const caption = req.body.caption;
    const imagePath = req.file.path.replace(/\\/g, "/");
    const image = imagePath;

    if (!image || !caption) {
      return res.status(400).json({
        success: false,
        message: "Image and caption are required",
      });
    }

    const post = await Post.create({
      image,
      caption: caption.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};


export const updatePost = async (req, res) => {
  try {
    const {id} = req.params
    const { data } = req.body;

    console.log(id, data)

    if (!id || !data) {
      return res.status(400).json({
        success: false,
        message: "Post id and update data are required",
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
