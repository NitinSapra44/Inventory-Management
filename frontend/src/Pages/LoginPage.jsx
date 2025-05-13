import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../usercontext";
import { useContext } from "react";

function LoginPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function loginUser(ev) {
    try {
      ev.preventDefault();
      const data = { email, password };
      const response = await axios.post(
        "http://localhost:5000/user/login",
        data,
        {
          withCredentials: true,
        }
      );
      if (response) {
        alert("User Login Successful");
        navigate("/");
        setUser(response.data);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status outside 2xx
        alert(error.response.data.Message || "Login failed");
      } else if (error.request) {
        // Request made but no response
        alert("No response from server. Please try again later.");
      } else {
        // Something else happened
        alert("An error occurred. Please try again.");
      }

      setEmail("");
      setPassword("");
      navigate("/login");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={loginUser}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

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
            onChange={(ev) => {
              setEmail(ev.target.value);
            }}
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
            onChange={(ev) => {
              setPassword(ev.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
        <div className="p-2 flex flex-row gap-1">
          <div>New user?</div>
          <Link className="text-red-600" to={"/register"}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
