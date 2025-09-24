import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import Login from "./pages/Login";
import { FarmerDashboard } from "@/components/dashboards/FarmerDashboard";
import { TestingDashboard } from "@/components/dashboards/TestingDashboard";
import { ManufacturingDashboard } from "@/components/dashboards/ManufacturingDashboard";
import { PackagingDashboard } from "@/components/dashboards/PackagingDashboard";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";

const queryClient = new QueryClient();

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <Layout>{children}</Layout>;
}

// Dashboard Router based on user role
function DashboardRouter() {
  const { user } = useAuth();
  
  if (!user) return null;
  
  switch (user.role) {
    case 'farmer':
      return <FarmerDashboard />;
    case 'testing':
      return <TestingDashboard />;
    case 'manufacturing':
      return <ManufacturingDashboard />;
    case 'packaging':
      return <PackagingDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <div>Invalid role</div>;
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
