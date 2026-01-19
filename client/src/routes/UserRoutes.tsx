import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import VerifyOTPPage from "../pages/Otp";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/otp" element={<VerifyOTPPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
