import { Truck, Home, Package, BarChart3, User, LogOut, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export const Navigation = ({ activeTab, onTabChange, onLogout }: NavigationProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "shipments", label: "Shipments", icon: Package },
    { id: "collaboration", label: "Collaboration", icon: Users },
    { id: "social", label: "Social", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">UrbanLift.AI</h1>
            </div>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={cn(
                      "inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      activeTab === item.id
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};