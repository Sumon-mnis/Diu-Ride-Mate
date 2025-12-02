import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, MapPin, Clock, DollarSign } from "lucide-react";

interface RideConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  ride: any;
}

export default function RideConfirmationModal({ isOpen, onClose, ride }: RideConfirmationModalProps) {
  if (!ride) return null;

  const handleContactDriver = () => {
    // In a real app, this would open phone/messaging app
    alert(`Contact driver: ${ride.driver.phone || "+880 1712-345678"}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <DialogTitle className="text-xl">Ride Request Sent!</DialogTitle>
          <p className="text-gray-600">
            Your ride request has been sent. The driver will contact you shortly.
          </p>
        </DialogHeader>
        
        <div className="space-y-3 bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Driver:</span>
            <span className="font-medium">{ride.driver.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pickup:</span>
            <span className="font-medium">{ride.pickupLocation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Departure:</span>
            <span className="font-medium">
              {new Date(ride.departureTime).toLocaleDateString()} at{" "}
              {new Date(ride.departureTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Price:</span>
            <span className="font-medium">{ride.price} BDT</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button onClick={handleContactDriver} className="flex-1">
            <Phone className="mr-2 h-4 w-4" />
            Contact Driver
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
