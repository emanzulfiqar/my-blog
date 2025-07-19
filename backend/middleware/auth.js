const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes - require authentication
const protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({
          error: "Not authorized, user not found",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({
        error: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      error: "Not authorized, no token",
    });
  }
};

// Optional auth - doesn't require authentication but adds user if available
const optionalAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (user) {
        req.user = user;
      }
    } catch (error) {
      // Token is invalid, but we don't fail the request
      console.error("Optional auth token error:", error);
    }
  }

  next();
};

// Check if user is author of post
const isAuthor = async (req, res, next) => {
  try {
    const Post = require("../models/Post");
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }

    // Check if user is the author
    if (!post.isAuthor(req.user._id)) {
      return res.status(403).json({
        error: "Not authorized, you can only modify your own posts",
      });
    }

    req.post = post;
    next();
  } catch (error) {
    return res.status(500).json({
      error: "Server error while checking post ownership",
    });
  }
};

module.exports = {
  protect,
  optionalAuth,
  isAuthor,
};
