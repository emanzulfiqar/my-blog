
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import RichTextEditor from "../components/RichTextEditor";
import { useBlogStore } from "../store/blogStore";
import toast from "react-hot-toast";

import { createPost } from "../services/PostServices"; 

const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
});

export default function CreatePostPage() {
  const navigate = useNavigate();
  const { addPost } = useBlogStore();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = async (data) => {
    if (!content.trim()) {
      toast.error("Content is required");
      return;
    }

    try {
      setIsLoading(true);

      const postData = await createPost({
        title: data.title,
        content,
      }); 

      if (postData) {
        addPost(postData);
        toast.success("Post created successfully!");
        navigate("/");
      } else {
        toast.error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error.response?.data?.error || "Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex align-items-center mb-4">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-outline-secondary me-3 d-flex align-items-center"
              >
                <ArrowLeft size={18} className="me-1" />
                Back
              </button>
              <h1 className="h2 mb-0">Create New Post</h1>
            </div>

            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="title" className="form-label">
                      Post Title
                    </label>
                    <input
                      {...register("title")}
                      type="text"
                      className={`form-control form-control-lg ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your post title"
                    />
                    {errors.title && (
                      <div className="invalid-feedback">
                        {errors.title.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Post Content</label>
                    <RichTextEditor
                      value={content}
                      onChange={setContent}
                      placeholder="Write your blog post content..."
                    />
                    {!content.trim() && (
                      <div className="text-danger mt-2">
                        Content is required
                      </div>
                    )}
                  </div>

                  <div className="d-flex justify-content-end gap-3">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-primary"
                    >
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Creating...
                        </>
                      ) : (
                        "Create Post"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
