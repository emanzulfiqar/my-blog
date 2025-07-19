import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import RichTextEditor from "../components/RichTextEditor";
import { useBlogStore } from "../store/blogStore";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { getPostById} from "../services/GetServices";
import {updatePost as updatePostService } from "../services/PutServices"

const editPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
});

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updatePost } = useBlogStore();
  const { user } = useAuthStore();

  const [post, setPost] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(editPostSchema),
  });

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const postData = await getPostById(id); 

      if (!postData) {
        toast.error("Post not found");
        navigate("/");
        return;
      }

      const isAuthor = user && postData.authorId?._id === user.id;
      if (!isAuthor) {
        toast.error("You can only edit your own posts");
        navigate("/");
        return;
      }

      setPost(postData);
      setValue("title", postData.title);
      setContent(postData.content);
    } catch (error) {
      console.error("Error fetching post:", error);
      toast.error("Failed to fetch post");
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!content.trim()) {
      toast.error("Content is required");
      return;
    }

    try {
      setIsSaving(true);
      const updatedPostData = await updatePostService(id, {
        title: data.title,
        content,
      });

      if (updatedPostData) {
        updatePost(id, updatedPostData);
        toast.success("Post updated successfully!");
        navigate(`/post/${id}`);
      } else {
        toast.error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error(error.response?.data?.error || "Failed to update post");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Post not found
            </h1>
            <button onClick={() => navigate("/")} className="btn btn-primary">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex align-items-center mb-4 mt-4">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-outline-secondary me-3 d-flex align-items-center"
              >
                <ArrowLeft size={18} className="me-1" />
                Back
              </button>
              <h1 className="h2 mb-0">Edit Post</h1>
            </div>

            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                      <p className="invalid-feedback">{errors.title.message}</p>
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
                      <p className="text-danger mt-2">Content is required</p>
                    )}
                  </div>

                  <div className="d-flex justify-content-end gap-3 m-4">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
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
