import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Package, Truck, Clock, CheckCircle, AlertCircle, Navigation } from "lucide-react";
import { Shipment } from "@/hooks/useShipments";

interface MicroHubTrackingProps {
  shipment: Shipment;
}

interface HubStage {
  id: string;
  name: string;
  status: "completed" | "in-progress" | "pending";
  timestamp?: string;
  location: string;
  description: string;
  estimatedTime?: string;
}

export const MicroHubTracking = ({ shipment }: MicroHubTrackingProps) => {
  const [trackingStages] = useState<HubStage[]>([
    {
      id: "pickup",
      name: "Pickup Completed",
      status: shipment.status === "Delivered" || shipment.status === "In Transit" ? "completed" : "in-progress",
      timestamp: shipment.status !== "Pending" ? "Today, 9:30 AM" : undefined,
      location: shipment.pickupLocation,
      description: "Package collected from merchant location"
    },
    {
      id: "hub-arrival",
      name: "Micro-Hub Arrival",
      status: shipment.status === "Delivered" || shipment.status === "In Transit" ? "completed" : "pending",
      timestamp: shipment.status === "Delivered" || shipment.status === "In Transit" ? "Today, 11:15 AM" : undefined,
      location: "Central Delhi Micro-Hub",
      description: "Package sorted and consolidated with other shipments",
      estimatedTime: shipment.status === "Pending" ? "2 hours" : undefined
    },
    {
      id: "route-optimization",
      name: "Route Optimization",
      status: shipment.status === "Delivered" || shipment.status === "In Transit" ? "completed" : "pending",
      timestamp: shipment.status === "Delivered" || shipment.status === "In Transit" ? "Today, 12:00 PM" : undefined,
      location: "AI Processing Center",
      description: "Optimal delivery route calculated with other packages",
      estimatedTime: shipment.status === "Pending" ? "3 hours" : undefined
    },
    {
      id: "dispatch",
      name: "EV Fleet Dispatch",
      status: shipment.status === "Delivered" ? "completed" : shipment.status === "In Transit" ? "in-progress" : "pending",
      timestamp: shipment.status === "Delivered" ? "Today, 1:30 PM" : shipment.status === "In Transit" ? "Today, 1:30 PM" : undefined,
      location: "Compact EV - DL-8C-1234",
      description: "Package loaded for final mile delivery",
      estimatedTime: shipment.status === "Pending" ? "4 hours" : undefined
    },
    {
      id: "delivery",
      name: "Delivered",
      status: shipment.status === "Delivered" ? "completed" : "pending",
      timestamp: shipment.status === "Delivered" ? "Today, 3:45 PM" : undefined,
      location: shipment.dropoffLocation,
      description: "Package successfully delivered to recipient",
      estimatedTime: shipment.status !== "Delivered" ? shipment.eta : undefined
    }
  ]);

  const getProgressPercentage = () => {
    const completedStages = trackingStages.filter(stage => stage.status === "completed").length;
    return (completedStages / trackingStages.length) * 100;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-info" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-success";
      case "in-progress":
        return "text-info";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Real-Time Tracking
              </CardTitle>
              <CardDescription>
                Track your shipment through our micro-hub network
              </CardDescription>
            </div>
            <Badge className="bg-info text-info-foreground">
              {shipment.id}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Overall Progress</p>
              <p className="text-sm text-muted-foreground">{Math.round(getProgressPercentage())}% Complete</p>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Current Status</p>
              <p className="text-sm text-muted-foreground">{shipment.status}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Estimated Delivery</p>
              <p className="text-sm text-muted-foreground">{shipment.eta}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Delivery Method</p>
              <p className="text-sm text-muted-foreground">Shared Logistics</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Journey Timeline
          </CardTitle>
          <CardDescription>
            Detailed tracking through our micro-hub network and EV fleet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {trackingStages.map((stage, index) => (
              <div key={stage.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  {getStatusIcon(stage.status)}
                  {index < trackingStages.length - 1 && (
                    <div className={`w-px h-12 mt-2 ${
                      stage.status === "completed" ? "bg-success" : "bg-border"
                    }`} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium ${getStatusColor(stage.status)}`}>
                      {stage.name}
                    </h4>
                    {stage.timestamp && (
                      <Badge variant="outline" className="text-xs">
                        {stage.timestamp}
                      </Badge>
                    )}
                    {stage.estimatedTime && !stage.timestamp && (
                      <Badge variant="secondary" className="text-xs">
                        ETA: {stage.estimatedTime}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {stage.description}
                  </p>
                  
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{stage.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {shipment.route_data && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Shared Route Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Total Distance</p>
                <p className="text-sm text-muted-foreground">{shipment.route_data.distance}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Delivery Stops</p>
                <p className="text-sm text-muted-foreground">{shipment.route_data.stops} locations</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Shared With</p>
                <p className="text-sm text-muted-foreground">{shipment.route_data.sharedWith}</p>
              </div>
            </div>
            
            {shipment.savings && (
              <div className="mt-4 p-3 bg-success/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">
                    Cost Savings: ₹{shipment.savings} through shared logistics
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Live Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-info/10 rounded-lg">
              <div className="w-2 h-2 bg-info rounded-full animate-pulse" />
              <div>
                <p className="text-sm font-medium">Real-time Monitoring Active</p>
                <p className="text-xs text-muted-foreground">
                  GPS tracking and temperature monitoring enabled
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="w-4 h-4 mr-2" />
                View on Map
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Package className="w-4 h-4 mr-2" />
                Contact Delivery Partner
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};