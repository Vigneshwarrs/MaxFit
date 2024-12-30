import {Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/register/Register";
import Activation from "../auth/Activation";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import ProtectedRoute from "./ProtectedRoutes";
import MealPage from "../../pages/MealPage";
import WaterPage from "../../pages/WaterPage";

const Router = () => {
  return (
      <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/activate/:token" element={<Activation />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/meal" element={<MealPage />} />
          <Route path="/water" element={<WaterPage />} />
        </Route> 
      </Routes>
  );
};

export default Router;
