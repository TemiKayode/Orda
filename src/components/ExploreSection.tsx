
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star, Navigation } from 'lucide-react';

interface ExploreSectionProps {
  userCoordinates: {lat: number, lng: number} | null;
}

const ExploreSection = ({ userCoordinates }: ExploreSectionProps) => {
  const [selectedType, setSelectedType] = useState<'restaurants' | 'supermarkets'>('restaurants');

  const nearbyRestaurants = [
    {
      id: 1,
      name: "Spice Garden",
      type: "Indian Cuisine",
      distance: 0.8,
      rating: 4.6,
      deliveryTime: "20-25 mins",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      priceRange: "₦₦₦"
    },
    {
      id: 2,
      name: "Ocean Breeze",
      type: "Seafood",
      distance: 1.2,
      rating: 4.8,
      deliveryTime: "25-30 mins",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
      priceRange: "₦₦₦₦"
    },
    {
      id: 3,
      name: "Pizza Corner",
      type: "Italian",
      distance: 1.5,
      rating: 4.4,
      deliveryTime: "15-20 mins",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
      priceRange: "₦₦"
    }
  ];

  const nearbySupermarkets = [
    {
      id: 1,
      name: "Fresh Mart",
      type: "Grocery Store",
      distance: 0.5,
      rating: 4.7,
      deliveryTime: "30-45 mins",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      priceRange: "₦₦"
    },
    {
      id: 2,
      name: "Organic Plus",
      type: "Organic Foods",
      distance: 1.1,
      rating: 4.9,
      deliveryTime: "25-35 mins",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
      priceRange: "₦₦₦"
    }
  ];

  const currentData = selectedType === 'restaurants' ? nearbyRestaurants : nearbySupermarkets;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#102542]">Explore Near You</h2>
        <div className="flex space-x-2">
          <Button
            variant={selectedType === 'restaurants' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('restaurants')}
            className={selectedType === 'restaurants' 
              ? 'bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387]/90 hover:to-[#E94057]/90' 
              : 'hover:bg-gradient-to-r hover:from-[#8A2387]/10 hover:to-[#E94057]/10'
            }
          >
            Restaurants
          </Button>
          <Button
            variant={selectedType === 'supermarkets' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('supermarkets')}
            className={selectedType === 'supermarkets' 
              ? 'bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387]/90 hover:to-[#E94057]/90' 
              : 'hover:bg-gradient-to-r hover:from-[#8A2387]/10 hover:to-[#E94057]/10'
            }
          >
            Supermarkets
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData.map((place) => (
          <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md group">
            <div className="relative">
              <img 
                src={place.image} 
                alt={place.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387] hover:to-[#E94057]">
                <MapPin className="h-3 w-3 mr-1" />
                {place.distance}km
              </Badge>
              <Badge className="absolute top-3 right-3 bg-white text-gray-900 hover:bg-white">
                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                {place.rating}
              </Badge>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#102542] text-lg mb-1">{place.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{place.type}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {place.deliveryTime}
                </div>
                <span className="font-medium">{place.priceRange}</span>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387]/90 hover:to-[#E94057]/90 text-white">
                <Navigation className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ExploreSection;
