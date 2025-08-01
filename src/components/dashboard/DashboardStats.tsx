import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, CheckCircle, Clock, IndianRupee, Leaf } from "lucide-react";

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
      <div>
        <h2 className="text-lg font-semibold mb-4">Shipment Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="shadow-sm">
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
        <h2 className="text-lg font-semibold mb-4">Eco-Lift Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {impactCards.map((impact) => {
            const Icon = impact.icon;
            return (
              <Card key={impact.title} className="shadow-sm">
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