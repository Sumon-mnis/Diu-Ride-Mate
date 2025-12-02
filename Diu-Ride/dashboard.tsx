import { useState } from "react";
import Header from "@/components/layout/header";
import DriverDashboard from "@/components/dashboard/driver-dashboard";
import RiderDashboard from "@/components/dashboard/rider-dashboard";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Bike, User } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [activeMode, setActiveMode] = useState<"driver" | "rider">(
    user?.isDriver ? "driver" : "rider"
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      {/* Mode Toggle */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Button
              variant="ghost"
              className={`flex items-center space-x-2 py-4 border-b-2 ${
                activeMode === "driver"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveMode("driver")}
            >
              <Bike className="h-4 w-4" />
              <span>Driver Mode</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex items-center space-x-2 py-4 border-b-2 ${
                activeMode === "rider"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveMode("rider")}
            >
              <User className="h-4 w-4" />
              <span>Rider Mode</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeMode === "driver" ? <DriverDashboard /> : <RiderDashboard />}
      </main>
    </div>
  );
}
