import { Navigate, Route, Routes } from "react-router-dom";
import CreateTodo from "../components/container/CreateTodo";
import DashboardContainer from "../components/container/Dashboard";
import TodoContainer from "../components/container/Todo";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardContainer />} />
      <Route path="/todo" element={<TodoContainer />} />
      <Route path="/create-todo" element={<CreateTodo />} />
      <Route path="*" element={<Navigate to={"/dashboard"} />} />
    </Routes>
  );
};

export default AuthRoutes;
