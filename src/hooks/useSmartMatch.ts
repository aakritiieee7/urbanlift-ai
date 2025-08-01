import { useState, useEffect } from "react";
import { Shipment } from "./useShipments";

export interface SmartMatchResult {
  id: string;
  clusteredShipments: string[];
  optimizedRoute: string;
  totalSavings: number;
  estimatedDelivery: string;
  confidence: number;
  participants: Array<{
    merchantId: string;
    merchantName: string;
    goods: string;
    pickupLocation: string;
    dropoffLocation: string;
  }>;
}

export interface OptimizationRequest {
  shipments: Shipment[];
  area: string;
  timeWindow: string;
}

export const useSmartMatch = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lastOptimization, setLastOptimization] = useState<SmartMatchResult | null>(null);

  // Simulate AI clustering and route optimization
  const optimizeCluster = async (request: OptimizationRequest): Promise<SmartMatchResult> => {
    setIsOptimizing(true);
    
    // Simulate API delay for AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI optimization logic
    const clusteredShipmentIds = request.shipments
      .filter(s => s.status === "Pending" || s.status === "Processing")
      .slice(0, Math.min(3, request.shipments.length))
      .map(s => s.id);
    
    // Simulate clustering based on location proximity and goods compatibility
    const mockParticipants = [
      {
        merchantId: "USER_001",
        merchantName: "Your Business",
        goods: "Electronics",
        pickupLocation: "Chandni Chowk, Delhi",
        dropoffLocation: "Connaught Place, Delhi"
      },
      {
        merchantId: "MERCHANT_002", 
        merchantName: "TechMart Solutions",
        goods: "Electronics",
        pickupLocation: "Lajpat Nagar, Delhi",
        dropoffLocation: "Cyber City, Gurgaon"
      },
      {
        merchantId: "MERCHANT_003",
        merchantName: "Delhi Textiles Co.",
        goods: "Textiles", 
        pickupLocation: "Karol Bagh, Delhi",
        dropoffLocation: "Sector 18, Noida"
      }
    ];

    // Mock route optimization algorithm results
    const optimizedRoute = mockParticipants
      .map(p => `${p.pickupLocation} → ${p.dropoffLocation}`)
      .join(" → ");

    const totalDistance = Math.floor(Math.random() * 50) + 20; // 20-70 km
    const baseCost = totalDistance * 15; // ₹15 per km base rate
    const sharedCost = baseCost * 0.6; // 40% savings through sharing
    const totalSavings = baseCost - sharedCost;

    // AI confidence based on compatibility factors
    const locationCompatibility = 0.9; // High - all in Delhi/NCR
    const goodsCompatibility = 0.85; // Good - electronics + textiles
    const timeCompatibility = 0.95; // Excellent - same time window
    const confidence = Math.round((locationCompatibility + goodsCompatibility + timeCompatibility) / 3 * 100);

    const result: SmartMatchResult = {
      id: `CLUSTER_${Date.now()}`,
      clusteredShipments: clusteredShipmentIds,
      optimizedRoute,
      totalSavings,
      estimatedDelivery: "Today, 5:00 PM",
      confidence,
      participants: mockParticipants
    };

    setLastOptimization(result);
    setIsOptimizing(false);
    
    return result;
  };

  // Simulate real-time matching opportunities
  const findMatchingOpportunities = (userShipment: Shipment) => {
    // Mock AI analysis for compatible shipments
    const compatibilityFactors = {
      location: calculateLocationCompatibility(userShipment),
      goods: calculateGoodsCompatibility(userShipment),
      timing: calculateTimingCompatibility(userShipment),
      weight: calculateWeightCompatibility(userShipment)
    };

    const overallCompatibility = Object.values(compatibilityFactors).reduce((a, b) => a + b) / 4;
    
    if (overallCompatibility > 0.7) {
      return {
        hasMatches: true,
        confidence: Math.round(overallCompatibility * 100),
        estimatedSavings: Math.floor(userShipment.cost * 0.3), // 30% potential savings
        matchingFactors: compatibilityFactors
      };
    }

    return {
      hasMatches: false,
      confidence: 0,
      estimatedSavings: 0,
      matchingFactors: compatibilityFactors
    };
  };

  // Helper functions for compatibility calculations
  const calculateLocationCompatibility = (shipment: Shipment): number => {
    // Mock location analysis - in real app would use geospatial algorithms
    const delhiAreas = ["chandni chowk", "connaught place", "lajpat nagar", "karol bagh"];
    const pickup = shipment.pickupLocation.toLowerCase();
    const dropoff = shipment.dropoffLocation.toLowerCase();
    
    const pickupMatch = delhiAreas.some(area => pickup.includes(area));
    const dropoffMatch = delhiAreas.some(area => dropoff.includes(area));
    
    return (pickupMatch && dropoffMatch) ? 0.9 : 0.6;
  };

  const calculateGoodsCompatibility = (shipment: Shipment): number => {
    // Mock goods compatibility matrix
    const compatibleGoods = {
      "electronics": ["electronics", "documents", "textiles"],
      "textiles": ["textiles", "electronics", "documents"], 
      "food": ["food"],
      "chemicals": ["chemicals"],
      "machinery": ["machinery", "electronics"]
    };

    const shipmentType = shipment.goodsType.toLowerCase();
    return compatibleGoods[shipmentType as keyof typeof compatibleGoods]?.length > 1 ? 0.8 : 0.4;
  };

  const calculateTimingCompatibility = (shipment: Shipment): number => {
    // Mock timing analysis based on urgency
    const urgencyScore = {
      "low": 0.9,
      "normal": 0.8, 
      "high": 0.6,
      "urgent": 0.3
    };

    return urgencyScore[shipment.urgency as keyof typeof urgencyScore] || 0.7;
  };

  const calculateWeightCompatibility = (shipment: Shipment): number => {
    // Mock weight analysis - optimal truck capacity utilization
    const weight = parseInt(shipment.weight);
    if (weight >= 5 && weight <= 25) return 0.9; // Optimal range
    if (weight >= 25 && weight <= 50) return 0.7; // Good range
    return 0.5; // Suboptimal but manageable
  };

  return {
    optimizeCluster,
    findMatchingOpportunities,
    isOptimizing,
    lastOptimization
  };
};