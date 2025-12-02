import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star } from "lucide-react";

export default function RideHistory() {
  // Mock data - in a real app, this would come from an API
  const rideHistory = [
    {
      id: 1,
      type: "driver",
      pickupLocation: "Dhanmondi 27",
      destination: "DIU Campus",
      date: "2024-06-20",
      time: "08:30",
      passengers: 2,
      price: 50,
      status: "completed",
      rating: 4.8,
    },
    {
      id: 2,
      type: "rider",
      pickupLocation: "Uttara",
      destination: "DIU Campus",
      date: "2024-06-18",
      time: "09:00",
      driver: "Ahmed Hassan",
      price: 60,
      status: "completed",
      rating: 5.0,
    },
    {
      id: 3,
      type: "driver",
      pickupLocation: "Mirpur 10",
      destination: "DIU Campus",
      date: "2024-06-15",
      time: "08:45",
      passengers: 1,
      price: 45,
      status: "completed",
      rating: 4.5,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Ride History</h1>
            <div className="text-sm text-gray-500">
              {rideHistory.length} total rides
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rideHistory.length}</div>
                <p className="text-xs text-muted-foreground">
                  All time
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">As Driver</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {rideHistory.filter(ride => ride.type === "driver").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Rides offered
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">As Rider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {rideHistory.filter(ride => ride.type === "rider").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Rides taken
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Ride History List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Rides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rideHistory.map((ride) => (
                  <div
                    key={ride.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant={ride.type === "driver" ? "default" : "secondary"}>
                          {ride.type === "driver" ? "Driver" : "Rider"}
                        </Badge>
                        <Badge className={getStatusColor(ride.status)}>
                          {ride.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium text-gray-900">
                          {ride.pickupLocation} → {ride.destination}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {ride.date} at {ride.time}
                        </span>
                        
                        {ride.type === "driver" ? (
                          <span className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            {ride.passengers} passenger(s)
                          </span>
                        ) : (
                          <span>Driver: {ride.driver}</span>
                        )}
                        
                        <span className="font-medium">৳{ride.price}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{ride.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
