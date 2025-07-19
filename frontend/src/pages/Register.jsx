import React,{ useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { registerUser } from "../services/AuthServices"; 

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const { user, token } = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      login(user, token);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed");
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
                <h1 className="auth-title">Join Blog Portal</h1>
                <p className="auth-subtitle">
                  Create your account to start blogging
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      {...register("password")}
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      {...register("confirmPassword")}
                      type="password"
                      className={`form-control ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword.message}
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
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  <div className="text-center">
                    <p className="mb-0">
                      Already have an account?{" "}
                      <Link to="/login" className="text-decoration-none">
                        Sign in here
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
