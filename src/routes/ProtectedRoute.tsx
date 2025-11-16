// ProtectedRoute.tsx
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, userData, loading } = useAuth();

  console.log("🛡️ ProtectedRoute Check:", {
    loading,
    hasUser: !!user,
    userEmail: user?.email,
    userRole: userData?.role,
    requiredRole,
  });

  // Still loading
  if (loading) {
    console.log("⏳ ProtectedRoute: Still loading...");
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // No user - redirect to login
  if (!user) {
    console.log("❌ ProtectedRoute: No user, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  // Check role if required
  if (requiredRole && userData?.role !== requiredRole) {
    console.log("❌ ProtectedRoute: Role mismatch", {
      required: requiredRole,
      actual: userData?.role,
    });
    return <Navigate to="/" replace />;
  }

  console.log("✅ ProtectedRoute: Access granted");
  return children;
};

export default ProtectedRoute;
