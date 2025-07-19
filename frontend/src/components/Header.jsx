import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { LogOut, Home, Plus, User2Icon } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleOutsideClick = (e) => {
    if (isNavOpen && navRef.current && !navRef.current.contains(e.target)) {
      setIsNavOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isNavOpen]);

  const navigateAndClose = (path) => {
    navigate(path);
    setIsNavOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container" ref={navRef}>
        <a
          className="navbar-brand fw-bold text-primary"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigateAndClose("/");
          }}
        >
          📝 Blog Portal
        </a>

        
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        
        <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-lg-center text-center text-lg-start">
            <li className="nav-item mx-lg-2">
              <a
                className="nav-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigateAndClose("/");
                }}
              >
                <Home size={18} className="me-1" />
                Home
              </a>
            </li>

            <li className="nav-item mx-lg-2">
              <a
                className="nav-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigateAndClose("/create");
                }}
              >
                <Plus size={18} className="me-1" />
                New Post
              </a>
            </li>

            <li className="nav-item mx-lg-2">
              <a
                className="nav-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigateAndClose("/register");
                }}
              >
                <User2Icon size={18} className="me-1" />
                Register
              </a>
            </li>

            {user && (
              <li className="nav-item mx-lg-2 d-flex align-items-center">
                <span className="navbar-text d-flex align-items-center fw-semibold">
                  <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-2" style={{ width: 30, height: 30 }}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  {user.name}
                </span>
              </li>
            )}

            <li className="nav-item mx-lg-2 mt-2 mt-lg-0">
              <button
                onClick={() => {
                  handleLogout();
                  setIsNavOpen(false);
                }}
                className="btn btn-outline-danger btn-sm d-flex align-items-center w-100 justify-content-center"
              >
                <LogOut size={16} className="me-1" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
