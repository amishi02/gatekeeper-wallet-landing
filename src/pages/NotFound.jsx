import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10">
      <Navigation />
      
      <div className="pt-24 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <div className="text-8xl font-space-grotesk font-bold text-primary mb-4">
              404
            </div>
            <h1 className="text-3xl font-space-grotesk font-bold text-foreground mb-4">
              Page Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card">
            <div className="space-y-4">
              <Link to="/">
                <Button variant="gradient" size="lg" className="w-full font-semibold">
                  <Home className="w-5 h-5 mr-2" />
                  Return to Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="w-full"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
