import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const isProd = import.meta.env.MODE === "production";

  // 🔒 Block admin routes on GitHub Pages
  if (isProd) {
    return <Navigate to="/" replace />;
  }

  // ⏳ Optional loading guard
  if (loading) {
    return <p>Loading...</p>;
  }

  // 🔐 Allow only authenticated users in dev
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
