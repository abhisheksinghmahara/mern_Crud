import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User Registered:", formData);

    try {
      const response = await fetch("http://localhost:4800/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      setSubmitted(true);

      Swal.fire({
        title: "Registration Successful!",
        text: "You can now log in.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });

    } catch (error) {
      console.error("Error during registration:", error);
      alert(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h1 className="text-center mb-4">Register User</h1>
      <form className="bg-white p-4 shadow rounded w-100" onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input
            className="form-control"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="lastName">Last Name</label>
          <input
            className="form-control"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
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
          Register
        </button>
      </form>

      {submitted && (
        <div className="mt-4 text-success text-center">
          User registered successfully!
        </div>
      )}

      {error && (
        <div className="mt-4 text-danger text-center">
          {error}
        </div>
      )}

      <p className="text-center mt-3">
        Already have an account?{" "}
        <button className="btn btn-link" onClick={() => navigate("/")}>
          Login here
        </button>
      </p>
    </div>
  );
};

export default Register;
