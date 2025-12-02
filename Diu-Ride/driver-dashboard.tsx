import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertRideSchema, type InsertRide, type Ride } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LocationSearch } from "@/components/ui/location-search";
import { LiveLocation } from "@/components/features/live-location";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Star, Clock, MapPin, Users, Plus, Eye, X, Navigation } from "lucide-react";

export default function DriverDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: ridesData, isLoading: ridesLoading } = useQuery({
    queryKey: ["/api/rides/my-rides"],
  });

  const createRideMutation = useMutation({
    mutationFn: async (data: InsertRide) => {
      const response = await apiRequest("POST", "/api/rides", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rides/my-rides"] });
      toast({
        title: "Ride posted successfully",
        description: "Your ride offer is now live!",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to post ride",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const cancelRideMutation = useMutation({
    mutationFn: async (rideId: number) => {
      const response = await apiRequest("DELETE", `/api/rides/${rideId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rides/my-rides"] });
      toast({
        title: "Ride cancelled",
        description: "Your ride offer has been cancelled.",
      });
    },
  });

  const form = useForm<InsertRide>({
    resolver: zodResolver(insertRideSchema.omit({ driverId: true })),
    defaultValues: {
      pickupLocation: "",
      destination: "DIU Campus",
      departureTime: new Date(),
      availableSeats: 1,
      price: "50",
      notes: "",
      status: "active",
    },
  });

  const onSubmit = async (data: InsertRide) => {
    createRideMutation.mutate(data);
  };

  const handleLocationUpdate = (location: { lat: number; lng: number; address: string }) => {
    // Update the form with the current location
    form.setValue("pickupLocation", location.address);
  };

  const rides = ridesData?.rides || [];
  const activeRides = rides.filter((ride: Ride) => ride.status === "active");
  const completedRides = rides.filter((ride: Ride) => ride.status === "completed");

  return (
    <div className="space-y-6">
      {/* Driver Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{completedRides.length}</h3>
                <p className="text-sm text-gray-500">Completed Rides</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
                <p className="text-sm text-gray-500">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{activeRides.length}</h3>
                <p className="text-sm text-gray-500">Active Offers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Location & Post New Ride */}
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

        <Card>
          <CardHeader>
            <CardTitle>Post a New Ride</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="pickupLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Location</FormLabel>
                      <FormControl>
                        <LocationSearch
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select pickup location"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="departureTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departure Time</FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            {...field}
                            value={field.value instanceof Date ? field.value.toISOString().slice(0, 16) : field.value}
                            onChange={(e) => field.onChange(new Date(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="availableSeats"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Seats</FormLabel>
                        <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select seats" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 Seat</SelectItem>
                            <SelectItem value="2">2 Seats</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per Seat (BDT)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any specific instructions or preferences..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={createRideMutation.isPending}>
                  <Plus className="mr-2 h-4 w-4" />
                  {createRideMutation.isPending ? "Posting..." : "Post Ride Offer"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Current Active Rides */}
      <Card>
        <CardHeader>
          <CardTitle>Your Active Ride Offers</CardTitle>
        </CardHeader>
        <CardContent>
          {ridesLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : activeRides.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No active ride offers. Post your first ride above!
            </div>
          ) : (
            <div className="space-y-4">
              {activeRides.map((ride: Ride) => (
                <div key={ride.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium text-gray-900">
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
                          {ride.availableSeats} seat(s) available
                        </span>
                        <span>{ride.price} BDT</span>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      0 ride requests pending
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1 h-3 w-3" />
                        View Requests
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cancelRideMutation.mutate(ride.id)}
                        disabled={cancelRideMutation.isPending}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="mr-1 h-3 w-3" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
