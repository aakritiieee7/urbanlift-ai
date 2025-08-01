import { useState, useEffect } from "react";

export interface Shipment {
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
  description?: string;
  urgency: string;
  route_data?: {
    distance: string;
    stops: number;
    sharedWith: string;
  };
  savings?: number;
}

export const useShipments = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  // Load shipments from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("urbanlift_shipments");
    if (stored) {
      try {
        setShipments(JSON.parse(stored));
      } catch (error) {
        console.error("Error loading shipments:", error);
      }
    }
  }, []);

  // Save shipments to localStorage whenever shipments change
  useEffect(() => {
    localStorage.setItem("urbanlift_shipments", JSON.stringify(shipments));
  }, [shipments]);

  const addShipment = (shipment: Shipment) => {
    setShipments(prev => [shipment, ...prev]);
  };

  const updateShipmentStatus = (id: string, status: string) => {
    setShipments(prev =>
      prev.map(shipment =>
        shipment.id === id ? { ...shipment, status } : shipment
      )
    );
  };

  // Calculate stats from shipments
  const getStats = () => {
    const total = shipments.length;
    const delivered = shipments.filter(s => s.status === "Delivered").length;
    const inTransit = shipments.filter(s => s.status === "In Transit").length;
    const pending = shipments.filter(s => s.status === "Pending" || s.status === "Processing").length;
    
    const totalSavings = shipments.reduce((sum, s) => sum + (s.savings || 0), 0);
    const co2Reduced = Math.floor(delivered * 2.5); // Mock calculation: 2.5kg CO2 per delivered shipment

    return {
      totalShipments: total,
      delivered,
      inTransit,
      pending,
      totalSavings,
      co2Reduced,
    };
  };

  // Simulate status updates (for demo purposes)
  const simulateStatusUpdates = () => {
    setShipments(prev =>
      prev.map(shipment => {
        if (shipment.status === "Processing" && Math.random() > 0.7) {
          return { ...shipment, status: "Pending" };
        }
        if (shipment.status === "Pending" && Math.random() > 0.8) {
          return { ...shipment, status: "In Transit" };
        }
        if (shipment.status === "In Transit" && Math.random() > 0.9) {
          return { ...shipment, status: "Delivered" };
        }
        return shipment;
      })
    );
  };

  return {
    shipments,
    addShipment,
    updateShipmentStatus,
    getStats,
    simulateStatusUpdates,
  };
};