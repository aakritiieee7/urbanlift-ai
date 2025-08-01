import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, CheckCircle, Clock, MapPin, Package, Truck, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SharedShipment {
  id: string;
  title: string;
  route: string;
  participants: string[];
  totalCost: number;
  yourShare: number;
  savings: number;
  status: "pending" | "confirmed" | "in-transit" | "delivered";
  estimatedDelivery: string;
  coordinator: string;
  goods: Array<{
    merchant: string;
    type: string;
    weight: string;
  }>;
}

interface OpportunityMatch {
  id: string;
  route: string;
  compatibleGoods: string[];
  estimatedSavings: number;
  otherMerchants: string[];
  timeWindow: string;
  confidence: number;
}

export const SharedShipments = () => {
  const { toast } = useToast();
  
  // Mock shared shipments data
  const [sharedShipments] = useState<SharedShipment[]>([
    {
      id: "SHARED_001",
      title: "Delhi to Gurgaon Cluster",
      route: "Chandni Chowk → Connaught Place → Cyber City",
      participants: ["TechMart Electronics", "Fashion Hub", "Your Business"],
      totalCost: 800,
      yourShare: 300,
      savings: 150,
      status: "confirmed",
      estimatedDelivery: "Today, 4:00 PM",
      coordinator: "Rajesh Logistics",
      goods: [
        { merchant: "TechMart Electronics", type: "Electronics", weight: "15kg" },
        { merchant: "Fashion Hub", type: "Textiles", weight: "8kg" },
        { merchant: "Your Business", type: "Electronics", weight: "12kg" }
      ]
    },
    {
      id: "SHARED_002", 
      title: "Old Delhi Distribution",
      route: "Red Fort → Karol Bagh → Lajpat Nagar",
      participants: ["Spice Traders Co.", "Your Business"],
      totalCost: 450,
      yourShare: 225,
      savings: 75,
      status: "in-transit",
      estimatedDelivery: "Tomorrow, 2:00 PM",
      coordinator: "Delhi Express",
      goods: [
        { merchant: "Spice Traders Co.", type: "Food Items", weight: "20kg" },
        { merchant: "Your Business", type: "Electronics", weight: "10kg" }
      ]
    }
  ]);

  // Mock opportunity matches
  const [opportunities] = useState<OpportunityMatch[]>([
    {
      id: "OPP_001",
      route: "Nehru Place → Vasant Kunj → Dwarka",
      compatibleGoods: ["Electronics", "Textiles"],
      estimatedSavings: 200,
      otherMerchants: ["ModernTech Solutions", "Textile World"],
      timeWindow: "Next 2 hours",
      confidence: 92
    },
    {
      id: "OPP_002",
      route: "Lajpat Nagar → Greater Kailash → Saket",
      compatibleGoods: ["Electronics", "Documents"],
      estimatedSavings: 120,
      otherMerchants: ["QuickPrint Services"],
      timeWindow: "Tomorrow morning",
      confidence: 87
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-success text-success-foreground";
      case "in-transit":
        return "bg-info text-info-foreground";
      case "confirmed":
        return "bg-primary text-primary-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const handleJoinOpportunity = (opportunityId: string) => {
    toast({
      title: "Interest Registered",
      description: "Your interest has been registered. Other merchants will be notified."
    });
  };

  const handleApproveShipment = (shipmentId: string) => {
    toast({
      title: "Shipment Approved",
      description: "You have confirmed participation in this shared shipment."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Shared Logistics</h1>
          <p className="text-muted-foreground">Collaborate with other merchants for cost-effective deliveries</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {sharedShipments.length} Active Collaborations
        </Badge>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Shipments</TabsTrigger>
          <TabsTrigger value="opportunities">New Opportunities</TabsTrigger>
          <TabsTrigger value="history">Collaboration History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid gap-4">
            {sharedShipments.map((shipment) => (
              <Card key={shipment.id} className="shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{shipment.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {shipment.route}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(shipment.status)}>
                      {shipment.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Cost Breakdown</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Total Cost:</span>
                          <span>₹{shipment.totalCost}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Your Share:</span>
                          <span className="font-medium">₹{shipment.yourShare}</span>
                        </div>
                        <div className="flex justify-between text-sm text-success">
                          <span>You Save:</span>
                          <span className="font-medium">₹{shipment.savings}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Participants</p>
                      <div className="space-y-1">
                        {shipment.participants.map((participant, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Users className="w-3 h-3 text-muted-foreground" />
                            <span className={participant === "Your Business" ? "font-medium" : ""}>
                              {participant}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Delivery Info</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span>{shipment.estimatedDelivery}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Truck className="w-3 h-3 text-muted-foreground" />
                          <span>{shipment.coordinator}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Cargo Details</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {shipment.goods.map((item, index) => (
                        <div key={index} className="p-2 bg-secondary rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <Package className="w-3 h-3 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{item.merchant}</p>
                              <p className="text-xs text-muted-foreground">{item.type} • {item.weight}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {shipment.status === "pending" && (
                    <div className="flex gap-2 pt-2 border-t">
                      <Button 
                        onClick={() => handleApproveShipment(shipment.id)}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve & Join
                      </Button>
                      <Button variant="outline">Request Changes</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-info" />
                AI-Powered Matching
              </CardTitle>
              <CardDescription>
                Our SmartMatch engine has identified potential collaboration opportunities based on your shipping patterns
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-4">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.id} className="shadow-sm border-l-4 border-l-info">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        Route Opportunity
                        <Badge variant="secondary">{opportunity.confidence}% Match</Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {opportunity.route}
                      </CardDescription>
                    </div>
                    <Badge className="bg-info text-info-foreground">
                      Save ₹{opportunity.estimatedSavings}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Compatible Goods</p>
                      <div className="space-y-1">
                        {opportunity.compatibleGoods.map((good, index) => (
                          <Badge key={index} variant="outline" className="mr-1 mb-1">
                            {good}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Other Merchants</p>
                      <div className="space-y-1">
                        {opportunity.otherMerchants.map((merchant, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Users className="w-3 h-3 text-muted-foreground" />
                            <span>{merchant}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Time Window</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span>{opportunity.timeWindow}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button 
                      onClick={() => handleJoinOpportunity(opportunity.id)}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Express Interest
                    </Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Collaboration Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-sm text-muted-foreground">Completed Collaborations</p>
                </div>
                <div className="p-4 bg-success/10 rounded-lg">
                  <p className="text-2xl font-bold text-success">₹2,400</p>
                  <p className="text-sm text-muted-foreground">Total Savings</p>
                </div>
                <div className="p-4 bg-info/10 rounded-lg">
                  <p className="text-2xl font-bold text-info">45kg</p>
                  <p className="text-sm text-muted-foreground">CO₂ Reduced</p>
                </div>
                <div className="p-4 bg-warning/10 rounded-lg">
                  <p className="text-2xl font-bold text-warning">8</p>
                  <p className="text-sm text-muted-foreground">Partner Merchants</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};