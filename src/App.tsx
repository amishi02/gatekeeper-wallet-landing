import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "@/contexts/RoleContext";
import RoleBasedLayout from "@/components/layouts/RoleBasedLayout";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Guide from "./pages/Guide";
import Subscription from "./pages/Subscription";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
// Role-based pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import EnterpriseDashboard from "./pages/enterprise/EnterpriseDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import SupportDashboard from "./pages/support/SupportDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RoleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<RoleBasedLayout><Homepage /></RoleBasedLayout>} />
            <Route path="/about" element={<RoleBasedLayout><About /></RoleBasedLayout>} />
            <Route path="/guide" element={<RoleBasedLayout><Guide /></RoleBasedLayout>} />
            <Route path="/subscription" element={<RoleBasedLayout><Subscription /></RoleBasedLayout>} />
            <Route path="/contact" element={<RoleBasedLayout><Contact /></RoleBasedLayout>} />
            <Route path="/login" element={<RoleBasedLayout><Login /></RoleBasedLayout>} />
            <Route path="/register" element={<RoleBasedLayout><Register /></RoleBasedLayout>} />
            <Route path="/verify-email" element={<RoleBasedLayout><VerifyEmail /></RoleBasedLayout>} />
            <Route path="/forgot-password" element={<RoleBasedLayout><ForgotPassword /></RoleBasedLayout>} />
            <Route path="/reset-password" element={<RoleBasedLayout><ResetPassword /></RoleBasedLayout>} />
            
            {/* Admin routes */}
            <Route path="/admin/dashboard" element={<RoleBasedLayout><AdminDashboard /></RoleBasedLayout>} />
            
            {/* Enterprise routes */}
            <Route path="/enterprise/dashboard" element={<RoleBasedLayout><EnterpriseDashboard /></RoleBasedLayout>} />
            
            {/* User routes */}
            <Route path="/user/dashboard" element={<RoleBasedLayout><UserDashboard /></RoleBasedLayout>} />
            
            {/* Support routes */}
            <Route path="/support/dashboard" element={<RoleBasedLayout><SupportDashboard /></RoleBasedLayout>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<RoleBasedLayout><NotFound /></RoleBasedLayout>} />
          </Routes>
        </BrowserRouter>
    </TooltipProvider>
    </RoleProvider>
  </QueryClientProvider>
);

export default App;
