import { useState } from "react";
import { Film, Mail } from "lucide-react";
import { otpSchema } from "../validators/OtpValidator";
import { errorToast, successToast } from "../components/Toast";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { sentOtp } from "../services/user.services";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("");
  const navigate=useNavigate()
  const stored = localStorage.getItem("userData");
  const userData = stored ? JSON.parse(stored) : null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = otpSchema.safeParse({otp});

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      errorToast(errors.otp?.[0] || "Invalid input");
      return;
    }

    try {
      const response = await sentOtp(userData, otp);
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.removeItem("userData");
      const message = response.data.message;
      successToast(message);
      navigate("/home");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      console.log(err);
      errorToast(error.response?.data?.message ?? "Something went wrong");
    }
  };

  const handleResend = () => {
    setOtp("");
    alert("OTP has been resent to your email");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-linear-to-r from-green-600 to-teal-600 p-3 rounded-full mb-4">
            <Film className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Verify OTP</h1>
          <p className="text-gray-400 mt-2 text-center">
            We've sent a verification code to
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Mail className="w-4 h-4 text-purple-400" />
            <p className="text-purple-400 font-medium">{userData.email}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Enter 6-digit verification code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              className="w-full px-4 py-4 bg-gray-700 border border-gray-600 text-white text-center text-2xl font-bold tracking-widest rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-500"
              placeholder="000000"
            />
          </div>

          <button
            onClick={handleVerify}
            className="w-full bg-linear-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition duration-200 shadow-lg"
          >
            Verify OTP
          </button>

          <div className="text-center space-y-3">
            <p className="text-gray-400 text-sm">
              Didn't receive the code?{" "}
              <button
                onClick={handleResend}
                className="text-purple-400 font-semibold hover:text-purple-300 transition"
              >
                Resend OTP
              </button>
            </p>
            <p className="text-gray-500 text-xs">
              Code expires in 10:00 minutes
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="text-gray-400 hover:text-gray-300 transition text-sm">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
