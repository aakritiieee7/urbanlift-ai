import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, CheckCircle, Clock, IndianRupee, Leaf, TrendingUp, Globe } from "lucide-react";
import logisticsHero from "@/assets/logistics-hero.jpg";

interface StatsData {
  totalShipments: number;
  inTransit: number;
  delivered: number;
  pending: number;
  totalSavings: number;
  co2Reduced: number;
}

interface DashboardStatsProps {
  stats: StatsData;
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const statsCards = [
    {
      title: "Total Shipments",
      value: stats.totalShipments,
      icon: Package,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "In Transit",
      value: stats.inTransit,
      icon: Truck,
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      title: "Delivered",
      value: stats.delivered,
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  const impactCards = [
    {
      title: "Cost Savings",
      value: `₹${stats.totalSavings.toLocaleString()}`,
      icon: IndianRupee,
      color: "text-success",
      bgColor: "bg-success/10",
      description: "Saved through shared logistics",
    },
    {
      title: "CO₂ Reduced",
      value: `${stats.co2Reduced}kg`,
      icon: Leaf,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Environmental impact reduction",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden shadow-elegant">
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${logisticsHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center text-center text-primary-foreground">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome to UrbanLift.AI</h1>
              <p className="text-lg opacity-90">Smart logistics, shared success, sustainable future</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm">AI-Optimized Routes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span className="text-sm">Eco-Friendly Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">📊 Your Shipment Overview</h2>
          <p className="text-sm text-muted-foreground">Real-time logistics dashboard</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="shadow-card hover:shadow-glow transition-all duration-300 bg-gradient-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">🌱 Eco-Lift Impact</h2>
          <p className="text-sm text-muted-foreground">Your environmental contribution</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {impactCards.map((impact) => {
            const Icon = impact.icon;
            return (
              <Card key={impact.title} className="shadow-card hover:shadow-elegant transition-all duration-300 bg-gradient-primary text-primary-foreground border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {impact.title}
                      </p>
                      <p className="text-2xl font-bold">{impact.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {impact.description}
                      </p>
                    </div>
                    <div className={`${impact.bgColor} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${impact.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};