import axios from "axios";
import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // เพิ่ม useAuth hook

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (data.token && data.user) {
        login(data.user, data.token); // ใช้ login function จาก context
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Login failed"
      );
    } finally {
      setLoading(false);
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
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            className="w-full bg-green-700 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "Logining..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-700 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
