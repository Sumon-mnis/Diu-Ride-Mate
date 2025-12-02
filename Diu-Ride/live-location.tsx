import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LiveLocationProps {
  onLocationUpdate?: (location: { lat: number; lng: number; address: string }) => void;
}

export function LiveLocation({ onLocationUpdate }: LiveLocationProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const getCurrentLocation = () => {
    setIsTracking(true);
    setError(null);

    if (!navigator.geolocation) {
      const errorMsg = "Geolocation is not supported by this browser.";
      setError(errorMsg);
      setIsTracking(false);
      toast({
        title: "Location Error",
        description: errorMsg,
        variant: "destructive",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding to get address
          const address = await reverseGeocode(latitude, longitude);
          const locationData = {
            lat: latitude,
            lng: longitude,
            address: address
          };
          
          setLocation(locationData);
          onLocationUpdate?.(locationData);
          
          toast({
            title: "Location Found",
            description: `Current location: ${address}`,
          });
        } catch (err) {
          console.error("Error getting address:", err);
          const locationData = {
            lat: latitude,
            lng: longitude,
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          };
          
          setLocation(locationData);
          onLocationUpdate?.(locationData);
          
          toast({
            title: "Location Found",
            description: "Location detected but address lookup failed",
          });
        }
        
        setIsTracking(false);
      },
      (err) => {
        let errorMsg = "Unable to retrieve your location.";
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMsg = "Location access denied. Please enable location services.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMsg = "Location information unavailable.";
            break;
          case err.TIMEOUT:
            errorMsg = "Location request timed out.";
            break;
        }
        
        setError(errorMsg);
        setIsTracking(false);
        toast({
          title: "Location Error",
          description: errorMsg,
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    // Using a free geocoding service (you can replace with your preferred service)
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      
      if (!response.ok) {
        throw new Error("Geocoding failed");
      }
      
      const data = await response.json();
      
      // Format the address for Bangladesh
      const parts = [];
      if (data.locality) parts.push(data.locality);
      if (data.city) parts.push(data.city);
      if (data.principalSubdivision) parts.push(data.principalSubdivision);
      if (data.countryName) parts.push(data.countryName);
      
      return parts.join(", ") || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch (err) {
      // Fallback to coordinates if geocoding fails
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Navigation className="h-5 w-5" />
          <span>Live Location</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Button
            onClick={getCurrentLocation}
            disabled={isTracking}
            className="flex items-center space-x-2"
          >
            <MapPin className="h-4 w-4" />
            <span>{isTracking ? "Getting Location..." : "Get Current Location"}</span>
          </Button>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {location && (
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Current Location</p>
                <p className="text-sm text-green-700">{location.address}</p>
                <p className="text-xs text-green-600 mt-1">
                  Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500">
          <p>📍 Make sure location services are enabled in your browser</p>
          <p>🔒 Your location data is only used for ride matching</p>
        </div>
      </CardContent>
    </Card>
  );
}