
import { Star, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  isOpen: boolean;
  specialties: string[];
  distance?: number;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md group">
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          {restaurant.isOpen ? (
            <Badge className="bg-green-500 hover:bg-green-500">Open</Badge>
          ) : (
            <Badge variant="secondary" className="bg-gray-500 text-white hover:bg-gray-500">Closed</Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-white text-gray-900 hover:bg-white">
            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
            {restaurant.rating}
          </Badge>
        </div>
        {restaurant.distance && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387] hover:to-[#E94057]">
              <MapPin className="h-3 w-3 mr-1" />
              {restaurant.distance}km
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-[#102542] text-lg mb-1">{restaurant.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{restaurant.cuisine}</p>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {restaurant.deliveryTime}
          </div>
          <div className="flex items-center">
            <span>₦{restaurant.deliveryFee} delivery</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {restaurant.specialties.slice(0, 3).map((specialty, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs bg-gradient-to-r from-[#8A2387]/10 to-[#E94057]/10 text-[#E94057] hover:from-[#8A2387]/20 hover:to-[#E94057]/20"
            >
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
