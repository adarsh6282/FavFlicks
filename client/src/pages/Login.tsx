import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import image from "../assets/icon.png";
import { errorToast, successToast } from "../components/Toast";
import { loginSchema } from "../validators/LoginValidator";
import { loginS } from "../services/user.services";
import type { AxiosError } from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const handleLogin = async () => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      errorToast(result.error.issues[0].message);
      return;
    }

    try {
      const response = await loginS(email, password);
      const token = response.data.token;
      const message = response.data.message;
      localStorage.setItem("token", token);
      successToast(message);
      navigate("/home");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      console.log(err);
      errorToast(error.response?.data?.message ?? "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <img className="h-30 w-30" src={image} alt="" />
          <h1 className="text-3xl font-bold text-white">FavFlicks</h1>
          <p className="text-gray-400 mt-2">Welcome back!</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-500"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-linear-to-br from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition duration-200 shadow-lg"
          >
            Login
          </button>
        </div>

        {/* <div className="mt-4 text-center">
          <button className="text-sm text-gray-400 hover:text-gray-300 transition">
            Forgot password?
          </button>
        </div> */}

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-purple-400 font-semibold hover:text-purple-300 transition"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
