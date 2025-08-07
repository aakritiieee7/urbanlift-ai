import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, Weight, Truck, Sparkles, Route } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import truckTracking from "@/assets/truck-tracking.jpg";

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
    <div className="space-y-6">
      {/* Header Section */}
      <div className="relative rounded-lg overflow-hidden shadow-colored">
        <div 
          className="h-32 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${truckTracking})` }}
        >
          <div className="absolute inset-0 bg-gradient-blue opacity-85" />
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div>
              <h2 className="text-2xl font-bold mb-1">🚚 Create Shipment Request</h2>
              <p className="text-sm opacity-90">AI-powered route optimization & smart logistics matching</p>
            </div>
          </div>
        </div>
      </div>
      
      <Card className="shadow-card border-0 bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-primary" />
            Shipment Details
          </CardTitle>
          <CardDescription>
            🎯 Our AI analyzes millions of routes to find the most efficient and cost-effective delivery options for you.
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

          <Button type="submit" className="w-full bg-gradient-primary hover:shadow-elegant transition-all duration-300" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4 animate-spin" />
                🤖 AI Optimizing Route...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Create Smart Shipment
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
    </div>
  );
};