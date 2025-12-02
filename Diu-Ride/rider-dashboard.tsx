import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LocationSearch } from "@/components/ui/location-search";
import { LiveLocation } from "@/components/features/live-location";
import { useToast } from "@/hooks/use-toast";
import { Route, Coins, Clock, MapPin, Users, Search, Star, Phone, Navigation } from "lucide-react";
import RideConfirmationModal from "@/components/modals/ride-confirmation-modal";

export default function RiderDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedRide, setSelectedRide] = useState<any>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { data: ridesData, isLoading: ridesLoading } = useQuery({
    queryKey: ["/api/rides"],
  });

  const { data: requestsData, isLoading: requestsLoading } = useQuery({
    queryKey: ["/api/ride-requests/my-requests"],
  });

  const requestRideMutation = useMutation({
    mutationFn: async (rideId: number) => {
      const response = await apiRequest("POST", "/api/ride-requests", {
        rideId,
        message: "I would like to join this ride.",
      });
      return response.json();
    },
    onSuccess: (data, rideId) => {
      queryClient.invalidateQueries({ queryKey: ["/api/ride-requests/my-requests"] });
      const ride = ridesData?.rides.find((r: any) => r.id === rideId);
      if (ride) {
        setSelectedRide(ride);
        setShowConfirmationModal(true);
      }
      toast({
        title: "Ride request sent",
        description: "Your request has been sent to the driver.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to request ride",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const searchForm = useForm({
    defaultValues: {
      location: "",
      time: "",
    },
  });

  const handleSearchSubmit = (data: any) => {
    // For now, just show all rides
    // In a real app, this would filter the results
    console.log("Search data:", data);
  };

  const handleLocationUpdate = (location: { lat: number; lng: number; address: string }) => {
    // Update the search form with the current location
    searchForm.setValue("location", location.address);
  };

  const handleRequestRide = (ride: any) => {
    requestRideMutation.mutate(ride.id);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const rides = ridesData?.rides || [];
  const requests = requestsData?.requests || [];

  return (
    <div className="space-y-6">
      {/* Rider Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Route className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">8</h3>
                <p className="text-sm text-gray-500">Total Rides</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Coins className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">৳240</h3>
                <p className="text-sm text-gray-500">Money Saved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{requests.length}</h3>
                <p className="text-sm text-gray-500">Active Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Location */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Navigation className="h-5 w-5" />
              <span>Your Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LiveLocation onLocationUpdate={handleLocationUpdate} />
          </CardContent>
        </Card>

        {/* Search Rides */}
        <Card>
          <CardHeader>
            <CardTitle>Find a Ride</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...searchForm}>
              <form onSubmit={searchForm.handleSubmit(handleSearchSubmit)} className="space-y-4">
                <FormField
                  control={searchForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Location</FormLabel>
                      <FormControl>
                        <LocationSearch
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Search pickup location..."
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={searchForm.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Time</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Search Rides
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Available Rides */}
      <Card>
        <CardHeader>
          <CardTitle>Available Rides</CardTitle>
        </CardHeader>
        <CardContent>
          {ridesLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : rides.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No rides available at the moment.
            </div>
          ) : (
            <div className="space-y-4">
              {rides.map((ride: any) => (
                <div key={ride.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gray-300 text-gray-600">
                            {getInitials(ride.driver.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-gray-900">{ride.driver.name}</h3>
                          <div className="flex items-center space-x-1">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(parseFloat(ride.driver.rating))
                                      ? "fill-current"
                                      : ""
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">({ride.driver.rating})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="text-gray-900">
                            {ride.pickupLocation} → {ride.destination}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {new Date(ride.departureTime).toLocaleDateString()} at{" "}
                            {new Date(ride.departureTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          <span className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            {ride.availableSeats} seat(s) left
                          </span>
                          <span>{ride.price} BDT</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button
                        onClick={() => handleRequestRide(ride)}
                        disabled={requestRideMutation.isPending}
                        className="mb-2"
                      >
                        Request Ride
                      </Button>
                      <p className="text-xs text-gray-500">5 min away</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* My Ride Requests */}
      <Card>
        <CardHeader>
          <CardTitle>My Ride Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {requestsLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No ride requests yet.
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request: any) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium text-gray-900">
                          {request.ride.pickupLocation} → {request.ride.destination}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {new Date(request.ride.departureTime).toLocaleDateString()} at{" "}
                          {new Date(request.ride.departureTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span>Driver: {request.ride.driver.name}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      request.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : request.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Requested {new Date(request.createdAt).toLocaleDateString()}
                    </div>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      Cancel Request
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <RideConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        ride={selectedRide}
      />
    </div>
  );
}
