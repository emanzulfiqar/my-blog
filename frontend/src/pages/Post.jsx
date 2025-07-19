
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import Header from "../components/Header";
import toast from "react-hot-toast";
import { format } from "date-fns";
import React from "react";
import { useAuthStore } from "../store/authStore";
import { getPostById } from "../services/GetServices";
import { deletePostById } from "../services/DeleteServices";
import DeleteConfirmationModal from "../components/ConfirmToast";


export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      setPost({ ...postData, isAuthor });
    } catch (error) {
      console.error("Error fetching post:", error);
      toast.error("Failed to fetch post");
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };
  //   toast((t) => (
  //     <div>
  //       <p className="font-medium">Are you sure you want to delete this post?</p>
  //       <div className="mt-2 flex justify-end space-x-2">
  //         <button
  //           onClick={() => {
  //             toast.dismiss(t.id);
  //             performDelete();
  //           }}
  //           className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
  //         >
  //           Yes
  //         </button>
  //         <button
  //           onClick={() => toast.dismiss(t.id)}
  //           className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded text-sm"
  //         >
  //           No
  //         </button>
  //       </div>
  //     </div>
  //   ), {
  //     duration: 10000,
  //   });
  // };
  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deletePostById(id);
      toast.success("Post deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error(error.response?.data?.error || "Failed to delete post");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
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
            <button onClick={() => navigate("/")} className="btn-primary">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DeleteConfirmationModal
        show={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />

      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-primary flex items-center mr-4 mt-4 mb-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900 flex-1">
              {post.title}
            </h1>
            {post.isAuthor && (
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/edit/${post._id}`)}
                  className="btn btn-secondary m-2"
                >
                  <Edit size={16} className="m-1 mt-0" />
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  disabled={isDeleting}
                  className="btn btn-danger m-2 disabled:opacity-50"
                >
                  <Trash2 size={16} className="m-1 mt-0" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>

          <div className="card custom-card">
            <div className="mb-6">
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <span>
                  By {post.authorId?.name || post.author?.name || "Unknown"}
                </span>
                <span>{format(new Date(post.createdAt), "MMM dd, yyyy")}</span>
                {post.updatedAt && post.updatedAt !== post.createdAt && (
                  <span>
                    Updated {format(new Date(post.updatedAt), "MMM dd, yyyy")}
                  </span>
                )}
              </div>
            </div>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
