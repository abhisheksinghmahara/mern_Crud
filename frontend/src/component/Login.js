import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);

    try {
      const response = await fetch("http://localhost:4800/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error("Login failed: " + errorMessage);
      }

      const data = await response.json();
      setSubmitted(true);
      setError(null);

      localStorage.setItem("user", JSON.stringify(data));

      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/employee-data");
      });
    } catch (err) {
      console.error(err);
      setError(err.message);

      Swal.fire({
        title: "Login Failed!",
        text: err.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h1 className="text-center mb-4">Login</h1>
      <form
        className="bg-white p-4 shadow rounded w-100"
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>

      {submitted && (
        <div className="mt-4 text-success text-center">
          User logged in successfully!
        </div>
      )}

      {error && (
        <div className="mt-4 text-danger text-center">
          {error}
        </div>
      )}

      <p className="text-center mt-3">
        Don't have an account?{" "}
        <button className="btn btn-link" onClick={() => navigate("/Register")}>
          Register here
        </button>
      </p>
    </div>
  );
};

export default Login;
