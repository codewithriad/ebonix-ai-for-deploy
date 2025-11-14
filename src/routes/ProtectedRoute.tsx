import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: string; // optional (for admin-only routes)
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, userData, loading } = useAuth();

  // still loading user info
  if (loading) return <p className="text-center mt-10">Loading...</p>;

  // no user → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // if specific role is required and user doesn't match → redirect home
  if (requiredRole && userData?.role !== requiredRole)
    return <Navigate to="/" replace />;

  // all good ✅
  return children;
};

export default ProtectedRoute;
