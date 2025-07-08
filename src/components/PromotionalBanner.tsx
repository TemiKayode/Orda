
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PromotionalBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const promotions = [
    {
      id: 1,
      title: "50% OFF Combo Deals",
      subtitle: "Get Jollof Rice + Chicken + Drink",
      price: "₦2,500",
      originalPrice: "₦5,000",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500",
      gradient: "from-[#8A2387] to-[#E94057]"
    },
    {
      id: 2,
      title: "Buy 2 Get 1 FREE",
      subtitle: "Suya Platters & Drinks",
      price: "₦4,000",
      originalPrice: "₦6,000",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500",
      gradient: "from-[#E94057] to-[#F27121]"
    },
    {
      id: 3,
      title: "Weekend Special",
      subtitle: "Family Pack - Serves 4",
      price: "₦8,500",
      originalPrice: "₦12,000",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500",
      gradient: "from-[#F27121] to-[#8A2387]"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promotions.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  return (
    <section className="mb-8">
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {promotions.map((promo) => (
            <Card key={promo.id} className="min-w-full border-0 shadow-lg">
              <CardContent className={`p-0 bg-gradient-to-r ${promo.gradient} text-white relative overflow-hidden`}>
                <div className="flex items-center justify-between p-6 md:p-8">
                  <div className="flex-1">
                    <Badge className="bg-white/20 text-white mb-4 hover:bg-white/30">
                      <Percent className="h-3 w-3 mr-1" />
                      LIMITED TIME
                    </Badge>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{promo.title}</h3>
                    <p className="text-lg mb-4 opacity-90">{promo.subtitle}</p>
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-3xl font-bold">{promo.price}</span>
                      <span className="text-lg line-through opacity-70">{promo.originalPrice}</span>
                    </div>
                    <Button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold">
                      Order Now
                    </Button>
                  </div>
                  <div className="hidden md:block">
                    <img 
                      src={promo.image} 
                      alt={promo.title}
                      className="w-48 h-48 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {promotions.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;
