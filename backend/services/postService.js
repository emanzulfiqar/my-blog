const Post = require("../models/Post");


const getAllPosts = async (queryParams) => {
  const { page = 1, limit = 10, search } = queryParams;
  const skip = (page - 1) * limit;

  const query = {};
  if (search) {
    query.$text = { $search: search };
  }


  const posts = await Post.findWithAuthor(query).skip(skip).limit(limit);

  const total = await Post.countDocuments(query);

  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  };
};


const getPostById = async (postId, userId = null) => {
  const post = await Post.findByIdWithAuthor(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  
  const responseData = {
    ...post.toObject(),
    isAuthor: userId ? post.isAuthor(userId) : false,
  };

  return responseData;
};


const createPost = async (postData, authorId) => {
  const { title, content } = postData;

  const post = await Post.create({
    title,
    content,
    authorId,
  });

  
  await post.populate("authorId", "name email");

  return {
    ...post.toObject(),
    isAuthor: true,
  };
};


const updatePost = async (postId, updateData) => {
  const { title, content } = updateData;
  const updateFields = {};

  if (title) updateFields.title = title;
  if (content) updateFields.content = content;

  const post = await Post.findByIdAndUpdate(postId, updateFields, {
    new: true,
    runValidators: true,
  }).populate("authorId", "name email");

  return {
    ...post.toObject(),
    isAuthor: true,
  };
};


const deletePost = async (postId) => {
  const post = await Post.findByIdAndDelete(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};


const getUserPosts = async (userId, queryParams) => {
  const { page = 1, limit = 10 } = queryParams;
  const skip = (page - 1) * limit;

  const posts = await Post.findWithAuthor({ authorId: userId })
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments({ authorId: userId });

  return {
    posts: posts.map((post) => ({
      ...post.toObject(),
      isAuthor: true,
    })),
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  };
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
};
