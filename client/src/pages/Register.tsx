import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User,Mail,Lock } from "lucide-react";
import image from "../assets/icon.png"
import { registerSchema } from "../validators/RegisterValidator";
import { errorToast, successToast } from "../components/Toast";
import { registerS } from "../services/user.services";
import type { AxiosError } from "axios";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  });
  const navigate=useNavigate()

  const handleRegister = async() => {
  const result = registerSchema.safeParse(formData);

  if (!result.success) {
    errorToast(result.error.issues[0].message);
    return;
  }

  try {
    const response=await registerS(formData.email)
    const message=response.data.message
    localStorage.setItem("userData",JSON.stringify(formData))
    successToast(message)
    navigate("/otp")
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
          <p className="text-gray-400 mt-2">Create your account</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData,name:e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-500"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData,email:e.target.value})}
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
                value={formData.password}
                onChange={(e) => setFormData({...formData,password:e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-500"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData,confirmPassword:e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-500"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition duration-200 shadow-lg"
          >
            Register
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link
              to={"/"}
              className="text-purple-400 font-semibold hover:text-purple-300 transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage