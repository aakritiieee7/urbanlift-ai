import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, Weight, Truck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ShipmentFormProps {
  onSubmit: (shipmentData: any) => void;
}

export const ShipmentForm = ({ onSubmit }: ShipmentFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    pickupLocation: "",
    dropoffLocation: "",
    goodsType: "",
    weight: "",
    description: "",
    urgency: "normal",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate AI optimization API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock AI response
    const aiOptimization = {
      eta: "2-3 hours",
      cost: Math.floor(Math.random() * 500) + 200,
      route_data: {
        distance: "12.5 km",
        stops: 3,
        sharedWith: "2 other shipments"
      },
      matched: true,
      savings: Math.floor(Math.random() * 200) + 100,
    };

    const shipmentData = {
      id: `SHIP_${Date.now()}`,
      ...formData,
      status: "Processing",
      createdAt: new Date().toISOString(),
      ...aiOptimization,
    };

    toast({
      title: "Shipment Request Created!",
      description: `Your shipment has been optimized. Estimated cost: ₹${aiOptimization.cost}`,
    });

    onSubmit(shipmentData);
    
    // Reset form
    setFormData({
      title: "",
      pickupLocation: "",
      dropoffLocation: "",
      goodsType: "",
      weight: "",
      description: "",
      urgency: "normal",
    });

    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Create New Shipment Request
        </CardTitle>
        <CardDescription>
          Fill in the details below and our AI will optimize your delivery route and find cost-effective shared logistics options.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Shipment Title</Label>
              <Input
                id="title"
                placeholder="Electronics Delivery"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goodsType">Goods Type</Label>
              <Select value={formData.goodsType} onValueChange={(value) => handleInputChange("goodsType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select goods type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="textiles">Textiles</SelectItem>
                  <SelectItem value="food">Food Items</SelectItem>
                  <SelectItem value="machinery">Machinery</SelectItem>
                  <SelectItem value="chemicals">Chemicals</SelectItem>
                  <SelectItem value="documents">Documents</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Pickup Location
              </Label>
              <Input
                id="pickup"
                placeholder="Chandni Chowk, Delhi"
                value={formData.pickupLocation}
                onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dropoff" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Drop-off Location
              </Label>
              <Input
                id="dropoff"
                placeholder="Connaught Place, Delhi"
                value={formData.dropoffLocation}
                onChange={(e) => handleInputChange("dropoffLocation", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center gap-2">
                <Weight className="w-4 h-4" />
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="10"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Within 24 hours</SelectItem>
                  <SelectItem value="normal">Normal - Within 12 hours</SelectItem>
                  <SelectItem value="high">High - Within 6 hours</SelectItem>
                  <SelectItem value="urgent">Urgent - ASAP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Additional Description</Label>
            <Textarea
              id="description"
              placeholder="Any special handling instructions or additional details..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 animate-pulse" />
                AI Optimizing Route...
              </div>
            ) : (
              "Create Shipment Request"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};