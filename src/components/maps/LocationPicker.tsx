
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";

interface LocationPickerProps {
  onLocationSelect: (location: { address: string; lat: number; lng: number }) => void;
  placeholder: string;
  label: string;
  initialValue?: string;
}

export const LocationPicker = ({ onLocationSelect, placeholder, label, initialValue = "" }: LocationPickerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [searchValue, setSearchValue] = useState(initialValue);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const API_KEY = "AIzaSyCCNuKoiHgqPxxjYnkG3P2ENhQlCWku8ak";

  // Check if Google Maps is already loaded
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).google?.maps) {
      setIsMapLoaded(true);
      initializeMap();
    } else {
      loadGoogleMaps();
    }
  }, []);

  const loadGoogleMaps = () => {
    // Remove existing script if any
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsMapLoaded(true);
      initializeMap();
    };
    script.onerror = () => {
      console.error("Failed to load Google Maps");
    };
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapRef.current || !(window as any).google?.maps) return;

    const google = (window as any).google;
    
    // Default to Delhi, India
    const defaultLocation = { lat: 28.6139, lng: 77.2090 };
    
    const mapInstance = new google.maps.Map(mapRef.current, {
      center: defaultLocation,
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    const geocoderInstance = new google.maps.Geocoder();
    setGeocoder(geocoderInstance);

    // Create marker
    const markerInstance = new google.maps.Marker({
      position: defaultLocation,
      map: mapInstance,
      draggable: true,
      title: "Select location",
    });

    // Add click listener to map
    mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        markerInstance.setPosition({ lat, lng });
        
        // Reverse geocode to get address
        geocoderInstance.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const address = results[0].formatted_address;
            setSearchValue(address);
            onLocationSelect({ address, lat, lng });
          }
        });
      }
    });

    // Add drag listener to marker
    markerInstance.addListener('dragend', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        
        geocoderInstance.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const address = results[0].formatted_address;
            setSearchValue(address);
            onLocationSelect({ address, lat, lng });
          }
        });
      }
    });

    setMap(mapInstance);
    setMarker(markerInstance);
  };

  const searchLocation = () => {
    if (!geocoder || !map || !marker || !searchValue.trim()) return;

    geocoder.geocode({ address: searchValue }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        
        map.setCenter({ lat, lng });
        marker.setPosition({ lat, lng });
        
        const address = results[0].formatted_address;
        setSearchValue(address);
        onLocationSelect({ address, lat, lng });
      } else {
        alert('Location not found. Please try a different search term.');
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchLocation();
    }
  };

  if (!isMapLoaded) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {label}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 bg-muted rounded-lg text-center space-y-4">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground animate-pulse" />
            <div>
              <h3 className="font-semibold mb-2">Loading Google Maps...</h3>
              <p className="text-sm text-muted-foreground">
                Please wait while we load the interactive map
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={searchLocation} size="icon">
            <Search className="w-4 h-4" />
          </Button>
        </div>
        <div 
          ref={mapRef} 
          className="w-full h-64 rounded-lg border bg-muted"
          style={{ minHeight: '256px' }}
        />
        <p className="text-xs text-muted-foreground">
          Click on the map or drag the marker to select a location
        </p>
      </CardContent>
    </Card>
  );
};
