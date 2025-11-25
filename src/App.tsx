import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import ModeSelection from "./pages/ModeSelection";
import LoginByRole from "./pages/LoginByRole";
import Login from "./pages/Login";
import RegisterStudent from "./pages/RegisterStudent";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import RoleSelection from "./pages/RoleSelection";
import TeacherDashboard from "./pages/TeacherDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        {/** Use createBrowserRouter + RouterProvider so we can opt into future flags and avoid v7 warnings */}
        <RouterProvider router={createBrowserRouter([
          { path: '/', element: <Index /> },
          { path: '/seleccion-modo', element: <ModeSelection /> },
          { path: '/role-selection', element: <RoleSelection /> },
          { path: '/teacher/dashboard', element: <ProtectedRoute><TeacherDashboard /></ProtectedRoute> },
          { path: '/login/:role', element: <LoginByRole /> },
          { path: '/login', element: <Login /> },
          { path: '/registro/estudiante', element: <RegisterStudent /> },
          { path: '/dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
          { path: '*', element: <NotFound /> }
        ] as any, { future: { v7_startTransition: true, v7_relativeSplatPath: true } } as any) } />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
