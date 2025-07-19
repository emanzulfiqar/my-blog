const express = require("express");
const Post = require("../models/Post");
const { protect, optionalAuth, isAuthor } = require("../middleware/auth");
const postService = require("../services/postService");

const router = express.Router();

router.get("/", optionalAuth, async (req, res) => {
  try {
    const result = await postService.getAllPosts(req.query);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({
      success: false,
      error: "Server error while fetching posts",
    });
  }
});

router.get("/:id", optionalAuth, async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id, req.user?._id);

    res.json({
      success: true,
      data: {
        post,
      },
    });
  } catch (error) {
    console.error("Get post error:", error);

    if (error.message === "Post not found") {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error while fetching post",
    });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const post = await postService.createPost(req.body, req.user.id);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: {
        post,
      },
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({
      success: false,
      error: "Server error while creating post",
    });
  }
});


router.put("/:id", protect, isAuthor, async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);

    res.json({
      success: true,
      message: "Post updated successfully",
      data: {
        post,
      },
    });
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).json({
      success: false,
      error: "Server error while updating post",
    });
  }
});


router.delete("/:id", protect, isAuthor, async (req, res) => {
  try {
    await postService.deletePost(req.params.id);

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);

    if (error.message === "Post not found") {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error while deleting post",
    });
  }
});

router.get("/user/me", protect, async (req, res) => {
  try {
    const result = await postService.getUserPosts(req.user.id, req.query);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Get user posts error:", error);
    res.status(500).json({
      success: false,
      error: "Server error while fetching user posts",
    });
  }
});

module.exports = router;
