
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Percent, Clock, Star } from 'lucide-react';

const FeaturedDeals = () => {
  const deals = [
    {
      id: 1,
      discount: "40% OFF",
      restaurant: "Mama's Kitchen",
      dish: "Jollof Rice Combo",
      originalPrice: 3500,
      discountedPrice: 2100,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400",
      timeLeft: "2 hours left"
    },
    {
      id: 2,
      discount: "35% OFF",
      restaurant: "Suya Master",
      dish: "Beef Suya Platter",
      originalPrice: 4000,
      discountedPrice: 2600,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
      timeLeft: "5 hours left"
    },
    {
      id: 3,
      discount: "30% OFF",
      restaurant: "Continental Delights",
      dish: "Pasta & Chicken",
      originalPrice: 3000,
      discountedPrice: 2100,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400",
      timeLeft: "1 hour left"
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#102542]">Featured Deals</h2>
        <Badge className="bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387] hover:to-[#E94057] text-white">
          <Percent className="h-3 w-3 mr-1" />
          Up to 40% OFF
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md group relative">
            {/* Discount Badge */}
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-gradient-to-r from-[#E94057] to-[#F27121] hover:from-[#E94057] hover:to-[#F27121] text-white font-bold">
                {deal.discount}
              </Badge>
            </div>

            <div className="relative">
              <img 
                src={deal.image} 
                alt={deal.dish}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              <div className="absolute bottom-4 right-4">
                <Badge className="bg-white text-gray-900 hover:bg-white">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {deal.rating}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#102542] text-lg mb-1">{deal.dish}</h3>
              <p className="text-sm text-gray-600 mb-3">{deal.restaurant}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-[#E94057]">₦{deal.discountedPrice.toLocaleString()}</span>
                  <span className="text-sm line-through text-gray-500">₦{deal.originalPrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {deal.timeLeft}
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387]/90 hover:to-[#E94057]/90 text-white">
                Order Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDeals;
