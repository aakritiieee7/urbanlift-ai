import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Package, Users, Clock, DollarSign, Sparkles } from "lucide-react";
import { Shipment } from "@/hooks/useShipments";
import { useAIOptimization } from "@/hooks/useAIOptimization";

interface CollaborationHubProps {
  userShipments: Shipment[];
  onCollaborate: (shipmentIds: string[]) => void;
}

interface NearbyShipment {
  id: string;
  title: string;
  merchantName: string;
  pickupLocation: string;
  dropoffLocation: string;
  goodsType: string;
  weight: string;
  cost: number;
  urgency: string;
  estimatedSavings: number;
  compatibilityScore: number;
  isHighlighted: boolean;
}

export const CollaborationHub = ({ userShipments, onCollaborate }: CollaborationHubProps) => {
  const [nearbyShipments, setNearbyShipments] = useState<NearbyShipment[]>([]);
  const [selectedShipments, setSelectedShipments] = useState<string[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const { toast } = useToast();
  const { optimizeRoutes } = useAIOptimization();

  // Generate mock nearby shipments with AI-powered matching
  useEffect(() => {
    const generateNearbyShipments = () => {
      const userDestinations = userShipments.map(s => s.dropoffLocation.toLowerCase());
      
      const mockShipments: NearbyShipment[] = [
        {
          id: "nearby-1",
          title: "Electronics Components",
          merchantName: "TechParts India",
          pickupLocation: "Sector 62, Noida",
          dropoffLocation: "Lajpat Nagar, New Delhi",
          goodsType: "Electronics",
          weight: "12 kg",
          cost: 850,
          urgency: "Standard",
          estimatedSavings: 320,
          compatibilityScore: 85,
          isHighlighted: userDestinations.some(dest => dest.includes("lajpat") || dest.includes("delhi"))
        },
        {
          id: "nearby-2",
          title: "Textile Samples",
          merchantName: "Fabric World",
          pickupLocation: "Karol Bagh, New Delhi",
          dropoffLocation: "Connaught Place, New Delhi",
          goodsType: "Textiles",
          weight: "8 kg",
          cost: 650,
          urgency: "High",
          estimatedSavings: 180,
          compatibilityScore: 92,
          isHighlighted: userDestinations.some(dest => dest.includes("connaught") || dest.includes("cp"))
        },
        {
          id: "nearby-3",
          title: "Food Products",
          merchantName: "Fresh Foods Co.",
          pickupLocation: "Azadpur Mandi, New Delhi",
          dropoffLocation: "Gurgaon Sector 14",
          goodsType: "Food Items",
          weight: "25 kg",
          cost: 1200,
          urgency: "High",
          estimatedSavings: 450,
          compatibilityScore: 78,
          isHighlighted: userDestinations.some(dest => dest.includes("gurgaon") || dest.includes("gurugram"))
        },
        {
          id: "nearby-4",
          title: "Medical Supplies",
          merchantName: "MedCore Supplies",
          pickupLocation: "Okhla, New Delhi",
          dropoffLocation: "Faridabad Industrial Area",
          goodsType: "Medical Equipment",
          weight: "15 kg",
          cost: 950,
          urgency: "Standard",
          estimatedSavings: 280,
          compatibilityScore: 73,
          isHighlighted: userDestinations.some(dest => dest.includes("faridabad"))
        }
      ];

      // Sort by compatibility score and highlight status
      return mockShipments.sort((a, b) => {
        if (a.isHighlighted && !b.isHighlighted) return -1;
        if (!a.isHighlighted && b.isHighlighted) return 1;
        return b.compatibilityScore - a.compatibilityScore;
      });
    };

    setNearbyShipments(generateNearbyShipments());
  }, [userShipments]);

  const handleShipmentSelection = (shipmentId: string) => {
    setSelectedShipments(prev => 
      prev.includes(shipmentId) 
        ? prev.filter(id => id !== shipmentId)
        : [...prev, shipmentId]
    );
  };

  const handleOptimizeAndCollaborate = async () => {
    if (selectedShipments.length === 0) {
      toast({
        title: "No shipments selected",
        description: "Please select at least one shipment to collaborate on.",
        variant: "destructive"
      });
      return;
    }

    setIsOptimizing(true);
    
    try {
      // Get selected shipment details
      const selectedShipmentDetails = nearbyShipments.filter(s => 
        selectedShipments.includes(s.id)
      );

      // Use AI to optimize the route
      const optimizedRoute = await optimizeRoutes(selectedShipmentDetails);
      
      toast({
        title: "🤝 Collaboration Initiated!",
        description: `AI has optimized a route for ${selectedShipments.length} shipments. Total savings: ₹${optimizedRoute.totalSavings}`,
      });

      onCollaborate(selectedShipments);
      setSelectedShipments([]);
      
    } catch (error) {
      toast({
        title: "Optimization failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High": return "destructive";
      case "Medium": return "default";
      case "Standard": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Collaboration Hub</h1>
          <p className="text-muted-foreground">
            Find nearby shipments and collaborate to save costs and reduce emissions
          </p>
        </div>
        {selectedShipments.length > 0 && (
          <Button 
            onClick={handleOptimizeAndCollaborate}
            disabled={isOptimizing}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {isOptimizing ? "Optimizing..." : `Optimize Route (${selectedShipments.length})`}
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{nearbyShipments.length}</p>
                <p className="text-sm text-muted-foreground">Available Partners</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-success" />
              <div>
                <p className="text-2xl font-bold">₹{nearbyShipments.reduce((sum, s) => sum + s.estimatedSavings, 0)}</p>
                <p className="text-sm text-muted-foreground">Potential Savings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-info" />
              <div>
                <p className="text-2xl font-bold">{nearbyShipments.filter(s => s.isHighlighted).length}</p>
                <p className="text-sm text-muted-foreground">Matching Routes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Shipments */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Available Nearby Shipments</h2>
        {nearbyShipments.map((shipment) => (
          <Card 
            key={shipment.id} 
            className={`cursor-pointer transition-all ${
              shipment.isHighlighted 
                ? "ring-2 ring-primary shadow-lg bg-primary/5" 
                : "hover:shadow-md"
            } ${
              selectedShipments.includes(shipment.id) 
                ? "ring-2 ring-success bg-success/5" 
                : ""
            }`}
            onClick={() => handleShipmentSelection(shipment.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {shipment.isHighlighted && <MapPin className="w-4 h-4 text-primary" />}
                    {shipment.title}
                  </CardTitle>
                  <CardDescription>{shipment.merchantName}</CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={getUrgencyColor(shipment.urgency)}>{shipment.urgency}</Badge>
                  {shipment.isHighlighted && (
                    <Badge variant="outline" className="text-primary border-primary">
                      Matching Route
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">From:</span> {shipment.pickupLocation}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">To:</span> {shipment.dropoffLocation}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Type:</span> {shipment.goodsType}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Weight:</span> {shipment.weight}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Cost: ₹{shipment.cost}</span>
                  <span className="text-sm text-success font-medium">
                    Save: ₹{shipment.estimatedSavings}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-warning" />
                  <span className="text-sm font-medium">
                    {shipment.compatibilityScore}% AI Match
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {nearbyShipments.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No nearby shipments available</h3>
            <p className="text-muted-foreground">
              Check back later for collaboration opportunities in your area.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};