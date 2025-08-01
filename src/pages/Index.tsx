import { useState, useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Navigation } from "@/components/ui/navigation";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ShipmentForm } from "@/components/shipments/ShipmentForm";
import { ShipmentList } from "@/components/shipments/ShipmentList";
import { useShipments } from "@/hooks/useShipments";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Package, User, RefreshCw } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  businessName: string;
  role: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { shipments, addShipment, getStats, simulateStatusUpdates } = useShipments();
  const { toast } = useToast();

  // Check for existing session
  useEffect(() => {
    const storedUser = localStorage.getItem("urbanlift_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error loading user:", error);
      }
    }
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    if (user && shipments.length > 0) {
      const interval = setInterval(() => {
        simulateStatusUpdates();
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [user, shipments.length, simulateStatusUpdates]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem("urbanlift_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("urbanlift_user");
    toast({
      title: "Logged out successfully",
      description: "Thank you for using UrbanLift.AI",
    });
  };

  const handleShipmentSubmit = (shipmentData: any) => {
    addShipment(shipmentData);
    setActiveTab("shipments");
  };

  const handleTrackShipment = (shipmentId: string) => {
    toast({
      title: "Tracking Information",
      description: `Real-time tracking for ${shipmentId} is now available in your dashboard.`,
    });
  };

  const stats = getStats();

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
                <p className="text-muted-foreground">{user.businessName}</p>
              </div>
              <Button
                variant="outline"
                onClick={simulateStatusUpdates}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </Button>
            </div>
            <DashboardStats stats={stats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Create a new shipment or view your recent deliveries
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setActiveTab("shipments")} 
                    className="w-full justify-start"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Create New Shipment
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("analytics")} 
                    className="w-full justify-start"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  {shipments.slice(0, 3).length > 0 ? (
                    <div className="space-y-3">
                      {shipments.slice(0, 3).map((shipment) => (
                        <div key={shipment.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{shipment.title}</p>
                            <p className="text-xs text-muted-foreground">{shipment.status}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ₹{shipment.cost}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No recent activity</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "shipments":
        return (
          <div className="space-y-8">
            <ShipmentForm onSubmit={handleShipmentSubmit} />
            <ShipmentList shipments={shipments} onTrack={handleTrackShipment} />
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <DashboardStats stats={stats} />
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>
                  Your logistics optimization performance over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-2xl font-bold text-primary">95%</p>
                    <p className="text-sm text-muted-foreground">On-time Delivery</p>
                  </div>
                  <div className="p-4 bg-success/10 rounded-lg">
                    <p className="text-2xl font-bold text-success">₹{Math.floor(stats.totalSavings / Math.max(stats.totalShipments, 1))}</p>
                    <p className="text-sm text-muted-foreground">Avg. Savings per Shipment</p>
                  </div>
                  <div className="p-4 bg-info/10 rounded-lg">
                    <p className="text-2xl font-bold text-info">{stats.co2Reduced}kg</p>
                    <p className="text-sm text-muted-foreground">CO₂ Reduced This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Business Name</p>
                    <p className="text-sm text-muted-foreground">{user.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Owner Name</p>
                    <p className="text-sm text-muted-foreground">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">User Type</p>
                    <p className="text-sm text-muted-foreground">MSME Owner</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={handleLogout} 
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
