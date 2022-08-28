import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
};

export default PublicRoutes;
