import { useState } from "react";

interface ShipmentData {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  goodsType: string;
  weight: string;
  cost: number;
  estimatedSavings: number;
}

interface OptimizedRoute {
  totalDistance: number;
  totalSavings: number;
  estimatedTime: string;
  route: string[];
  consolidationScore: number;
  environmentalImpact: {
    co2Saved: number;
    fuelSaved: number;
  };
}

export const useAIOptimization = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Simulate AI-powered route optimization
  const optimizeRoutes = async (shipments: ShipmentData[]): Promise<OptimizedRoute> => {
    setIsOptimizing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // AI-powered clustering algorithm simulation
      const locations = [
        ...shipments.map(s => s.pickupLocation),
        ...shipments.map(s => s.dropoffLocation)
      ];
      
      // Calculate distance matrix using mock geocoding
      const distanceMatrix = calculateDistanceMatrix(locations);
      
      // Apply clustering algorithm (k-means simulation)
      const clusters = performClustering(shipments);
      
      // Optimize route using traveling salesman algorithm approximation
      const optimizedRoute = solveTSP(locations);
      
      // Calculate savings and environmental impact
      const totalSavings = shipments.reduce((sum, s) => sum + s.estimatedSavings, 0);
      const consolidationBonus = Math.floor(totalSavings * 0.25); // 25% bonus for consolidation
      
      const result: OptimizedRoute = {
        totalDistance: optimizedRoute.distance,
        totalSavings: totalSavings + consolidationBonus,
        estimatedTime: optimizedRoute.estimatedTime,
        route: optimizedRoute.sequence,
        consolidationScore: calculateConsolidationScore(shipments),
        environmentalImpact: {
          co2Saved: Math.floor(shipments.length * 3.2), // kg CO2 per shipment
          fuelSaved: Math.floor(shipments.length * 1.8)  // liters
        }
      };
      
      return result;
      
    } finally {
      setIsOptimizing(false);
    }
  };

  // Mock distance calculation between two locations
  const calculateDistance = (location1: string, location2: string): number => {
    // Simplified distance calculation based on location names
    const locations = {
      "Sector 62, Noida": { lat: 28.6280, lng: 77.3649 },
      "Lajpat Nagar, New Delhi": { lat: 28.5677, lng: 77.2431 },
      "Karol Bagh, New Delhi": { lat: 28.6519, lng: 77.1909 },
      "Connaught Place, New Delhi": { lat: 28.6315, lng: 77.2167 },
      "Azadpur Mandi, New Delhi": { lat: 28.7041, lng: 77.1850 },
      "Gurgaon Sector 14": { lat: 28.4595, lng: 77.0266 },
      "Okhla, New Delhi": { lat: 28.5355, lng: 77.2640 },
      "Faridabad Industrial Area": { lat: 28.3670, lng: 77.3155 }
    };
    
    const loc1 = locations[location1 as keyof typeof locations] || { lat: 28.6, lng: 77.2 };
    const loc2 = locations[location2 as keyof typeof locations] || { lat: 28.6, lng: 77.2 };
    
    // Haversine formula approximation
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return 6371 * c; // Distance in km
  };

  // Create distance matrix for all locations
  const calculateDistanceMatrix = (locations: string[]): number[][] => {
    const matrix: number[][] = [];
    for (let i = 0; i < locations.length; i++) {
      matrix[i] = [];
      for (let j = 0; j < locations.length; j++) {
        if (i === j) {
          matrix[i][j] = 0;
        } else {
          matrix[i][j] = calculateDistance(locations[i], locations[j]);
        }
      }
    }
    return matrix;
  };

  // K-means clustering simulation for grouping shipments
  const performClustering = (shipments: ShipmentData[]): ShipmentData[][] => {
    // Simple clustering based on proximity
    const clusters: ShipmentData[][] = [];
    const used = new Set<string>();
    
    for (const shipment of shipments) {
      if (used.has(shipment.id)) continue;
      
      const cluster = [shipment];
      used.add(shipment.id);
      
      // Find nearby shipments
      for (const other of shipments) {
        if (used.has(other.id)) continue;
        
        const distance = calculateDistance(shipment.dropoffLocation, other.dropoffLocation);
        if (distance < 10) { // Within 10km
          cluster.push(other);
          used.add(other.id);
        }
      }
      
      clusters.push(cluster);
    }
    
    return clusters;
  };

  // Traveling Salesman Problem approximation
  const solveTSP = (allLocations: string[]) => {
    
    // Greedy nearest neighbor algorithm
    const route = [allLocations[0]];
    const unvisited = new Set(allLocations.slice(1));
    
    while (unvisited.size > 0) {
      const current = route[route.length - 1];
      let nearest = "";
      let minDistance = Infinity;
      
      for (const location of unvisited) {
        const distance = calculateDistance(current, location);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = location;
        }
      }
      
      route.push(nearest);
      unvisited.delete(nearest);
    }
    
    const totalDistance = route.reduce((sum, location, index) => {
      if (index === 0) return 0;
      return sum + calculateDistance(route[index - 1], location);
    }, 0);
    
    return {
      sequence: route,
      distance: Math.floor(totalDistance),
      estimatedTime: `${Math.floor(totalDistance / 25 * 60)} minutes` // Assuming 25 km/h average speed
    };
  };

  // Calculate consolidation efficiency score
  const calculateConsolidationScore = (shipments: ShipmentData[]): number => {
    const weightScore = Math.min(100, shipments.length * 15);
    const locationScore = Math.min(100, shipments.length * 20);
    const goodsCompatibility = shipments.every(s => 
      s.goodsType !== "Food Items" || shipments.every(other => other.goodsType === "Food Items")
    ) ? 100 : 75;
    
    return Math.floor((weightScore + locationScore + goodsCompatibility) / 3);
  };

  return {
    optimizeRoutes,
    isOptimizing
  };
};