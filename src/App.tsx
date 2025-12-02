import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ManageUsers from "./pages/ManageUsers";
import Guide from "./pages/Guide";
import Subscription from "./pages/Subscription";
import SubscriptionDetail from "./pages/SubscriptionDetail";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import ChangePassword from "./pages/ChangePassword";
import ConfigureCreds from "./pages/ConfigureCreds";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import SubscriptionPlanForm from "./pages/SubscriptionPlanForm";
import SubscriptionPlanUsers from "./pages/SubscriptionPlanUsers";
import CredentialsSuccess from "./pages/CredentialsSuccess";
import CredentialsExpired from "./pages/CredentialsExpired";
import PaymentProcessing from "./pages/PaymentProcessing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/subscription/detail" element={<SubscriptionDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/configure-creds" element={<ConfigureCreds />} />
            <Route path="/credentials-success" element={<CredentialsSuccess />} />
            <Route path="/credentials-expired" element={<CredentialsExpired />} />
            <Route path="/payment-processing" element={<PaymentProcessing />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/manage-users" element={
              <ProtectedRoute>
                <ManageUsers />
              </ProtectedRoute>
            } />
            <Route path="/change-password" element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            } />
            <Route path="/subscription-plans" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <SubscriptionPlans />
              </ProtectedRoute>
            } />
            <Route path="/subscription-plans/:id" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <SubscriptionPlanForm />
              </ProtectedRoute>
            } />
            <Route path="/subscription-plans/:id/users" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <SubscriptionPlanUsers />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
