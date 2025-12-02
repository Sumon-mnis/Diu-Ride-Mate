import { useState } from "react";
import Header from "@/components/layout/header";
import ProfileModal from "@/components/modals/profile-modal";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Edit, Phone, Mail, GraduationCap, Bike } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-primary text-white text-3xl">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-600">Student ID: {user.studentId}</p>
                  <p className="text-gray-600">{user.department}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.isDriver 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-green-100 text-green-800"
                    }`}>
                      {user.isDriver ? "Driver" : "Rider"}
                    </span>
                    <span className="text-sm text-gray-500">
                      Rating: {user.rating}/5.0
                    </span>
                  </div>
                </div>
                <Button onClick={() => setShowProfileModal(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.totalRides}</div>
                <p className="text-xs text-muted-foreground">
                  {user.isDriver ? "Rides offered" : "Rides taken"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rating</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.rating}</div>
                <p className="text-xs text-muted-foreground">
                  Out of 5.0
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Member Since</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {user.createdAt ? new Date(user.createdAt).getFullYear() : "2024"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Year joined
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-5 w-5 text-gray-400" />
                <span>{user.department}</span>
              </div>
              {user.isDriver && user.bikeDetails && (
                <div className="flex items-center space-x-3">
                  <Bike className="h-5 w-5 text-gray-400" />
                  <span>{user.bikeDetails}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </div>
  );
}
