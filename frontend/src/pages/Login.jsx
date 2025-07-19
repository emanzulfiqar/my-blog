import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import React from "react";

import { loginUser } from "../services/AuthServices";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const { user, token } = await loginUser(data);
      login(user, token);

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.error || error.message || "Login failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <div className="card auth-card">
              <div className="card-body">
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">
                  Sign in to your account to continue
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""
                        }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      {...register("password")}
                      type="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""
                        }`}
                      placeholder="Enter your password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-100 mb-3"
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center">
                    <p className="mb-0">
                      Don&apos;t have an account?{" "}
                      <Link to="/register" className="text-decoration-none">
                        Create one here
                      </Link>
                    </p>
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
