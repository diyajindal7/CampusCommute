import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

  const roles = JSON.parse(
    localStorage.getItem("userRoles") || "[]"
  );

  if (!roles.includes("admin")) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default AdminRoute;