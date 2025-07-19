import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogStore } from "../store/blogStore";
import { Edit, Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { useAuthStore } from "../store/authStore";
import { deletePostById } from "../services/DeleteServices";
import { fetchPostsPaginated } from "../services/GetServices";
import DeleteConfirmationModal from "../components/ConfirmToast";

export default function BlogList() {
  const navigate = useNavigate();
  const {
    posts,
    pagination,
    isLoading,
    setPosts,
    deletePost,
    setLoading,
    setError,
  } = useBlogStore();
  const { user } = useAuthStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { posts, pagination } = await fetchPostsPaginated(currentPage, 10);
      setPosts(posts, pagination);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError(error.response?.data?.error || "Failed to fetch posts");
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;
    try {
      setIsDeleting(true);
      await deletePostById(postToDelete);
      deletePost(postToDelete);
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error(error.response?.data?.error || "Failed to delete post");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-custom mx-auto"></div>
        <p className="mt-3 text-muted">Loading posts...</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="card blog-card">
          <div className="card-body text-center">
            <h5 className="card-title text-muted">No blog posts found</h5>
            <p className="card-text text-muted mb-4">
              Start your blogging journey by creating your first post.
            </p>
            <button
              onClick={() => navigate("/create")}
              className="btn btn-primary"
            >
              Create Your First Post
            </button>
          </div>
        </div>
      </div>
    );
  }

  // const isAuthor = posts.some((post) => post.authorId._id === user.id);

  return (
    <div>
      <DeleteConfirmationModal
        show={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
      <div className="row">
        {posts.map((post) => (
          <div key={post._id} className="col-lg-6 col-xl-4 mb-4">
            <div className="card blog-card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="card-title blog-card-title">{post.title}</h5>
                  <div className="dropdown">
                    <button
                      className="btn btn-sm btn-outline-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      Actions
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          onClick={() => navigate(`/post/${post._id}`)}
                          className="dropdown-item d-flex align-items-center"
                        >
                          <Eye size={16} className="me-2" />
                          View Post
                        </button>
                      </li>
                      {post.authorId._id === user.id && (
                        <>
                          <li>
                            <button
                              onClick={() => navigate(`/edit/${post._id}`)}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <Edit size={16} className="me-2" />
                              Edit Post
                            </button>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <button
                              onClick={() => handleDeleteClick(post._id)}
                              className="dropdown-item d-flex align-items-center text-danger"
                            >
                              <Trash2 size={16} className="me-2" />
                              Delete Post
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="blog-meta mb-3">
                  <small className="text-muted">
                    By {post.authorId?.name || post.author?.name || "Unknown"} •
                    {format(new Date(post.createdAt), " MMM dd, yyyy")}
                  </small>
                </div>

                <div
                  className="blog-excerpt"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.content.replace(/<[^>]*>/g, "").substring(0, 150) +
                      "...",
                  }}
                />

                <div className="mt-auto">
                  <button
                    onClick={() => navigate(`/post/${post._id}`)}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <nav aria-label="Blog pagination">
            <ul className="pagination">
              <li
                className={`page-item ${!pagination.hasPrevPage ? "disabled" : ""
                  }`}
              >
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="page-link"
                >
                  Previous
                </button>
              </li>

              <li className="page-item">
                <span className="page-link">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
              </li>

              <li
                className={`page-item ${!pagination.hasNextPage ? "disabled" : ""
                  }`}
              >
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="page-link"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}


    </div>
  );
}
