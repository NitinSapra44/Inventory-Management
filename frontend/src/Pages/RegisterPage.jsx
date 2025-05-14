import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function registerUser(ev) {
    ev.preventDefault();

    if (!email || !name || !password) {
      alert("Fill All Credentials");
    }

    const data = { email, name, password };

    axios
      .post("https://inventory-management-backend-xdly.onrender.com/user/register", data)
      .then(() => {
        alert("User Registration Successful");
        navigate("/");
      })
      .catch((err) => {
        const message =
          err?.response?.data.Message || "User Registration Failed ";
        alert(message);
        setEmail("");
        setPassword("");
        setName("");
        navigate("/login");
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={registerUser}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        {/* Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
        <div className="p-2 flex flex-row gap-1">
          <div>Already a user?</div>
          <Link className="text-red-600" to={"/login"}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
// const message = err.response?.data?.error|| "User Registration Failed";
