
import { useState } from 'react';
import { X, CreditCard, MapPin, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  total: number;
}

const CheckoutModal = ({ isOpen, onClose, cartItems, total }: CheckoutModalProps) => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      toast({ title: "Error", description: "Please sign in to place an order", variant: "destructive" });
      return;
    }

    if (!deliveryAddress || !phoneNumber) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate order placement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({ title: "Success", description: "Order placed successfully! You'll receive updates soon." });
      onClose();
    } catch (error) {
      toast({ title: "Error", description: "Failed to place order. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-[#8A2387] to-[#E94057] p-6 text-white relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <CreditCard className="h-8 w-8" />
                <div>
                  <h2 className="text-2xl font-bold">Checkout</h2>
                  <p className="text-white/80">Complete your order</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Summary */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                <div className="space-y-3">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.restaurant} × {item.quantity}</p>
                      </div>
                      <p className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#E94057]">₦{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Delivery Information</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                    <Textarea
                      placeholder="Enter your delivery address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="pl-10 min-h-[80px]"
                      required
                    />
                  </div>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>

                  <Textarea
                    placeholder="Special instructions (optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[60px]"
                  />
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="bg-gradient-to-r from-[#8A2387]/10 to-[#E94057]/10 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-[#E94057]" />
                  <span className="font-medium">Estimated delivery: 25-35 minutes</span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                className="w-full bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387]/90 hover:to-[#E94057]/90 text-white py-6 text-lg"
                disabled={loading}
              >
                {loading ? 'Placing Order...' : `Place Order - ₦${total.toLocaleString()}`}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutModal;
