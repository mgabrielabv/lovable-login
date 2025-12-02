import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { GatewayProvider } from "@/contexts/GatewayContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import ModeSelection from "./pages/ModeSelection";
import LoginByRole from "./pages/LoginByRole";
import LoginFixed from "./pages/LoginFixed";
import RegisterStudent from "./pages/RegisterStudent";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import RoleSelection from "./pages/RoleSelection";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import PersonalDashboard from "./pages/PersonalDashboard";
import MasterDashboard from "./pages/MasterDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <GatewayProvider>
          <Toaster />
          <Sonner />
          {/** Use createBrowserRouter + RouterProvider so we can opt into future flags and avoid v7 warnings */}
          <RouterProvider router={createBrowserRouter([
            { path: '/', element: <Index /> },
            { path: '/seleccion-modo', element: <ModeSelection /> },
            { path: '/role-selection', element: <RoleSelection /> },
            { path: '/teacher/dashboard', element: <ProtectedRoute allowedRoles={[ 'profesor' as any ]}><TeacherDashboard /></ProtectedRoute> },
            { path: '/student/dashboard', element: <ProtectedRoute allowedRoles={[ 'estudiante' as any ]}><StudentDashboard /></ProtectedRoute> },
            { path: '/personal/dashboard', element: <ProtectedRoute><PersonalDashboard /></ProtectedRoute> },
            { path: '/master/dashboard', element: <ProtectedRoute><MasterDashboard /></ProtectedRoute> },
            { path: '/login/:role', element: <LoginByRole /> },
            { path: '/login', element: <LoginFixed /> },
            { path: '/registro/estudiante', element: <RegisterStudent /> },
            { path: '/dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
            { path: '*', element: <NotFound /> }
          ] as any, { future: { v7_startTransition: true, v7_relativeSplatPath: true } } as any) } />
        </GatewayProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
