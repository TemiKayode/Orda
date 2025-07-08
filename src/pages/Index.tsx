import { useState, useEffect } from 'react';
import { MapPin, Search, Star, Clock, Truck, ShoppingCart, Percent, Navigation as NavigationIcon, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import RestaurantCard from '@/components/RestaurantCard';
import CategorySection from '@/components/CategorySection';
import LocationBanner from '@/components/LocationBanner';
import PromotionalBanner from '@/components/PromotionalBanner';
import ExploreSection from '@/components/ExploreSection';
import FeaturedDeals from '@/components/FeaturedDeals';
import SearchTab from '@/components/SearchTab';
import CartSidebar from '@/components/CartSidebar';
import AuthModal from '@/components/auth/AuthModal';
import CheckoutModal from '@/components/CheckoutModal';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [location, setLocation] = useState<string>('Detecting location...');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [userCoordinates, setUserCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const { currentUser, logout } = useAuth();

  // Auto-detect user location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoordinates({ lat: latitude, lng: longitude });
          
          // Check if user is in Osogbo area
          const osogboLat = 7.7840;
          const osogboLng = 4.5405;
          const distance = Math.sqrt(
            Math.pow(latitude - osogboLat, 2) + Math.pow(longitude - osogboLng, 2)
          );
          
          if (distance < 0.1) { // Roughly 10km radius
            setLocation('Osogbo, Osun State');
          } else {
            setLocation('Lagos, Nigeria'); // Fallback
          }
        },
        (error) => {
          console.log('Location access denied:', error);
          setLocation('Osogbo, Osun State'); // Default to Osogbo
        }
      );
    }
  }, []);

  // Osogbo restaurants data
  const osogboRestaurants = [
    {
      id: 1,
      name: "Embassy Restaurant",
      cuisine: "Continental",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      rating: 4.5,
      deliveryTime: "20-30 mins",
      deliveryFee: 500,
      isOpen: true,
      specialties: ["Continental", "Local Dishes", "Grills"],
      distance: 1.2,
      promotion: "10% off first order"
    },
    {
      id: 2,
      name: "Alhaja Food Canteen",
      cuisine: "Local (Yoruba)",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400",
      rating: 4.3,
      deliveryTime: "15-25 mins",
      deliveryFee: 400,
      isOpen: true,
      specialties: ["Amala", "Gbegiri", "Ewedu"],
      distance: 0.8
    },
    {
      id: 3,
      name: "Stomach Care",
      cuisine: "Nigerian",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400",
      rating: 4.4,
      deliveryTime: "20-30 mins",
      deliveryFee: 450,
      isOpen: true,
      specialties: ["Jollof Rice", "Fried Rice", "Chicken"],
      distance: 1.5,
      promotion: "Free delivery on orders above ₦5000"
    },
    {
      id: 4,
      name: "Amazing Taste Delicacies",
      cuisine: "African Fusion",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
      rating: 4.6,
      deliveryTime: "25-35 mins",
      deliveryFee: 550,
      isOpen: true,
      specialties: ["Fusion Dishes", "Local Delicacies"],
      distance: 2.1
    },
    {
      id: 5,
      name: "BT Barbecue",
      cuisine: "Barbecue",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
      rating: 4.7,
      deliveryTime: "15-20 mins",
      deliveryFee: 500,
      isOpen: true,
      specialties: ["Suya", "Grilled Chicken", "Barbecue"],
      distance: 0.9,
      promotion: "Buy 1 get 1 half price on suya"
    },
    {
      id: 6,
      name: "Shawarma & Co",
      cuisine: "Fast Food",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
      rating: 4.2,
      deliveryTime: "10-15 mins",
      deliveryFee: 300,
      isOpen: true,
      specialties: ["Shawarma", "Burgers", "Fries"],
      distance: 1.1
    },
    {
      id: 7,
      name: "BET Ofada & More",
      cuisine: "Yoruba Traditional",
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400",
      rating: 4.5,
      deliveryTime: "20-25 mins",
      deliveryFee: 450,
      isOpen: true,
      specialties: ["Ofada Rice", "Traditional Stews"],
      distance: 1.8,
      promotion: "Free drink with combo meal"
    },
    {
      id: 8,
      name: "Elysium Restaurant",
      cuisine: "Continental",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
      rating: 4.8,
      deliveryTime: "20-30 mins",
      deliveryFee: 600,
      isOpen: true,
      specialties: ["Continental Cuisine", "Fine Dining"],
      distance: 2.3
    }
  ];

  const trendingDishes = [
    { id: 1, name: 'Jollof Rice & Chicken', restaurant: 'Embassy Restaurant', price: 2500, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', rating: 4.8, prepTime: '25-30 mins', category: 'Nigerian' },
    { id: 2, name: 'Pepper Soup', restaurant: 'Alhaja Food Canteen', price: 1800, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400', rating: 4.6, prepTime: '20-25 mins', category: 'Nigerian' },
    { id: 3, name: 'Suya Platter', restaurant: 'BT Barbecue', price: 3000, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400', rating: 4.9, prepTime: '15-20 mins', category: 'Suya & Grills' }
  ];

  const categories = [
    { name: 'Nigerian', icon: '🍛', count: 120 },
    { name: 'Continental', icon: '🍝', count: 45 },
    { name: 'Fast Food', icon: '🍔', count: 68 },
    { name: 'Suya & Grills', icon: '🥩', count: 32 },
    { name: 'Swallow', icon: '🥣', count: 89 },
    { name: 'Drinks', icon: '🥤', count: 156 },
  ];

  const filteredDishes = selectedCategory 
    ? trendingDishes.filter(dish => dish.category === selectedCategory)
    : trendingDishes;

  const cartItems = [
    {
      id: 1,
      name: 'Jollof Rice & Chicken',
      restaurant: 'Embassy Restaurant',
      price: 2500,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=150'
    }
  ];

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 500; // Including delivery

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        onCartClick={() => setIsCartOpen(true)} 
        onAuthClick={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        onLogout={logout}
      />
      
      {/* Hero Section with Gradient */}
      <div className="bg-gradient-to-br from-[#8A2387] via-[#E94057] to-[#F27121] text-white px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <LocationBanner location={location} onLocationChange={setLocation} />
          
          <div className="mt-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Delicious food,<br />delivered to your door
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Discover the best restaurants in {location.split(',')[0]}. 
              Fresh ingredients, authentic flavors, fast delivery.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for restaurants or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg bg-white text-gray-900 border-0 rounded-2xl shadow-lg"
              />
            </div>

            {/* Delivery Animation */}
            <div className="mt-8 flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Truck className="h-5 w-5 animate-pulse" />
                <span className="text-sm">Delivering now...</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm">25 mins avg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Promotional Banner */}
        <PromotionalBanner />

        {/* Categories */}
        <CategorySection 
          categories={categories} 
          onCategoryClick={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {/* Featured Deals */}
        <FeaturedDeals />

        {/* Top Restaurants in Osogbo */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#102542]">Top Restaurants in Osogbo</h2>
            <Button variant="ghost" className="text-[#E94057] hover:text-[#E94057] hover:bg-[#E94057]/10">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {osogboRestaurants.slice(0, 6).map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>

        {/* Explore Section */}
        <ExploreSection userCoordinates={userCoordinates} />

        {/* Search Tab */}
        <SearchTab dishes={trendingDishes} />
      </div>

      {/* Modals */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />
      
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={cartTotal}
      />
    </div>
  );
};

export default Index;
