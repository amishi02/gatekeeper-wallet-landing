import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";

const PaymentProcessing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10">
      <Navigation />
      
      <div className="pt-24 pb-12 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-space-grotesk font-bold text-foreground mb-2">
              Payment Processing
            </h1>
            <p className="text-muted-foreground">
              Your subscription is being verified
            </p>
          </div>

          {/* Processing Card */}
          <div className="bg-card rounded-2xl p-8 shadow-card text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-primary animate-pulse" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Subscription Plan Purchase in Progress
              </h2>
              <p className="text-muted-foreground">
                The status will be updated shortly once the transaction is verified
              </p>
            </div>

            <Button 
              variant="gradient" 
              size="lg" 
              className="w-full font-semibold"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 bg-secondary/20 rounded-xl p-4 text-center">
            <p className="text-muted-foreground text-sm">
              <Shield className="w-4 h-4 inline mr-1" />
              Your payment is being securely processed. You will receive a confirmation email once complete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
