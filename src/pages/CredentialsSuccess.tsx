import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";

const CredentialsSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10">
      <Navigation />
      
      <div className="pt-24 pb-12 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-space-grotesk font-bold text-foreground mb-2">
              Configure Credentials
            </h1>
            <p className="text-muted-foreground">
              Your account setup is complete
            </p>
          </div>

          {/* Success Card */}
          <div className="bg-card rounded-2xl p-8 shadow-card text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Credentials Set Successfully
              </h2>
              <p className="text-muted-foreground">
                Login to continue
              </p>
            </div>

            <Button 
              variant="gradient" 
              size="lg" 
              className="w-full font-semibold"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 bg-secondary/20 rounded-xl p-4 text-center">
            <p className="text-muted-foreground text-sm">
              <Shield className="w-4 h-4 inline mr-1" />
              Your account credentials are securely encrypted and protected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialsSuccess;
