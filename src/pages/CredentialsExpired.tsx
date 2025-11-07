import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const CredentialsExpired = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGetNewLink = async () => {
    setLoading(true);
    
    // TODO: Implement resend configuration link logic
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Link Sent",
        description: "A new configuration link has been sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send new link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10">
      <Navigation />
      
      <div className="pt-24 pb-12 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-space-grotesk font-bold text-foreground mb-2">
              Configure Credentials
            </h1>
            <p className="text-muted-foreground">
              Account configuration issue
            </p>
          </div>

          {/* Error Card */}
          <div className="bg-card rounded-2xl p-8 shadow-card text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-10 h-10 text-destructive" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Link Cannot Be Opened
              </h2>
              <p className="text-muted-foreground mb-1">
                As it has expired
              </p>
              <p className="text-muted-foreground text-sm">
                Click on the button below to get a new link for account configuration
              </p>
            </div>

            <Button 
              variant="gradient" 
              size="lg" 
              className="w-full font-semibold"
              onClick={handleGetNewLink}
              disabled={loading}
            >
              {loading ? "Sending..." : "Get New Link"}
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

export default CredentialsExpired;
