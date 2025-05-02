import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const { token } = data;
      if (token) {
        localStorage.setItem("token", token);
        alert("Login successful!");
        navigate("/dashboard"); // Redirect to dashboard or home page
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <section className="bg-green-50 min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-3xl text-center text-green-700 font-bold mb-6">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-green-700 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition">
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-green-700 font-semibold">
            Register
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
