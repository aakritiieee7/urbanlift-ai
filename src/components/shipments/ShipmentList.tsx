import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, MapPin, Clock, IndianRupee, Truck, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface Shipment {
  id: string;
  title: string;
  pickupLocation: string;
  dropoffLocation: string;
  goodsType: string;
  weight: string;
  status: string;
  eta: string;
  cost: number;
  createdAt: string;
  route_data?: {
    distance: string;
    stops: number;
    sharedWith: string;
  };
}

interface ShipmentListProps {
  shipments: Shipment[];
  onTrack: (shipmentId: string) => void;
}

export const ShipmentList = ({ shipments, onTrack }: ShipmentListProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-success text-success-foreground";
      case "in transit":
        return "bg-info text-info-foreground";
      case "processing":
        return "bg-warning text-warning-foreground";
      case "pending":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  if (shipments.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardContent className="p-8 text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Shipments Yet</h3>
          <p className="text-muted-foreground">
            Create your first shipment request to get started with UrbanLift.AI
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your Shipments</h2>
        <Badge variant="secondary">{shipments.length} total</Badge>
      </div>
      
      <div className="grid gap-4">
        {shipments.map((shipment) => (
          <Card key={shipment.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{shipment.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    ID: {shipment.id}
                  </p>
                </div>
                <Badge className={cn("text-xs", getStatusColor(shipment.status))}>
                  {shipment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">From: {shipment.pickupLocation}</p>
                      <p className="text-muted-foreground">To: {shipment.dropoffLocation}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span>{shipment.goodsType} • {shipment.weight}kg</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>ETA: {shipment.eta}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <IndianRupee className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">₹{shipment.cost}</span>
                  </div>

                  {shipment.route_data && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Truck className="w-4 h-4" />
                      <span>{shipment.route_data.distance} • {shipment.route_data.sharedWith}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Created: {new Date(shipment.createdAt).toLocaleDateString()}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onTrack(shipment.id)}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Track
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};