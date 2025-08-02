import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Shield } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: "member" | "vip" | "vip++" | "mod" | "admin";
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
  requireRole,
  redirectTo,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Check authentication requirement
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate
        to={redirectTo || "/auth/login"}
        state={{ from: location }}
        replace
      />
    );
  }

  // Check role requirement
  if (requireRole && user) {
    const roleHierarchy = {
      member: 0,
      vip: 1,
      "vip++": 2,
      mod: 3,
      admin: 4,
    };

    const userLevel = roleHierarchy[user.role];
    const requiredLevel = roleHierarchy[requireRole];

    if (userLevel < requiredLevel) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-gray-400 mb-6">
              You need {requireRole} privileges or higher to access this area.
            </p>
            <Navigate to={redirectTo || "/dashboard"} replace />
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}

// Convenience components for different roles
export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requireAuth requireRole="admin">
      {children}
    </ProtectedRoute>
  );
}

export function ModeratorRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requireAuth requireRole="mod">
      {children}
    </ProtectedRoute>
  );
}

export function VIPRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requireAuth requireRole="vip">
      {children}
    </ProtectedRoute>
  );
}

export function AuthenticatedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute requireAuth>{children}</ProtectedRoute>;
}
