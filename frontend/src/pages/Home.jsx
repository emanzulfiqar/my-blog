import { useNavigate } from "react-router-dom";
import BlogList from "../components/BlogList";
import Header from "../components/Header";
import React from 'react';
export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      <section className="hero-section">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="hero-title">Welcome to Blog Portal</h1>
              <p className="hero-subtitle">
                Share your thoughts, ideas, and stories with the world. Create,
                edit, and manage your blog posts with ease.
              </p>
              <button
                onClick={() => navigate("/create")}
                className="btn btn-light btn-lg px-4"
              >
                Create New Post
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h3 mb-0">Latest Blog Posts</h2>
              <button
                onClick={() => navigate("/create")}
                className="btn btn-primary"
              >
                Create New Post
              </button>
            </div>
            <BlogList />
          </div>
        </div>
      </section>
    </div>
  );
}
