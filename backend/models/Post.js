const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


postSchema.virtual("author", {
  ref: "User",
  localField: "authorId",
  foreignField: "_id",
  justOne: true,
});

postSchema.index({ authorId: 1, createdAt: -1 });
postSchema.index({ title: "text", content: "text" });


postSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});


postSchema.statics.findWithAuthor = function (query = {}) {
  return this.find(query)
    .populate("authorId", "name email")
    .sort({ createdAt: -1 });
};


postSchema.statics.findByIdWithAuthor = function (id) {
  return this.findById(id).populate("authorId", "name email");
};

postSchema.methods.isAuthor = function (userId) {
  return this.authorId.toString() === userId.toString();
};

module.exports = mongoose.model("Post", postSchema);
