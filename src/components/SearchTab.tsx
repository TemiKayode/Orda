
import { useState } from 'react';
import { Search, TrendingUp, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Dish {
  id: number;
  name: string;
  restaurant: string;
  price: number;
  image: string;
  rating: number;
  prepTime: string;
  category: string;
}

interface SearchTabProps {
  dishes: Dish[];
}

const SearchTab = ({ dishes }: SearchTabProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'trending'>('search');

  const trendingSearches = [
    'Jollof Rice', 'Chicken', 'Suya', 'Pizza', 'Shawarma', 'Fried Rice', 'Pepper Soup', 'Egusi'
  ];

  const recentSearches = [
    'Mama Cass Kitchen', 'Suya Platter', 'Continental Bistro'
  ];

  const filteredDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dish.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dish.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularDishes = dishes.slice().sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#102542]">Discover Food</h2>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'search' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('search')}
            className={activeTab === 'search' 
              ? 'bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387]/90 hover:to-[#E94057]/90' 
              : 'hover:bg-gradient-to-r hover:from-[#8A2387]/10 hover:to-[#E94057]/10'
            }
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button
            variant={activeTab === 'trending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('trending')}
            className={activeTab === 'trending' 
              ? 'bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387]/90 hover:to-[#E94057]/90' 
              : 'hover:bg-gradient-to-r hover:from-[#8A2387]/10 hover:to-[#E94057]/10'
            }
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending
          </Button>
        </div>
      </div>

      {activeTab === 'search' && (
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for dishes, restaurants, or cuisine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg border-2 border-gray-200 focus:border-[#E94057] rounded-2xl"
            />
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((dish) => (
                <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md group">
                  <div className="relative">
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387] hover:to-[#E94057]">
                      {dish.rating}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[#102542] mb-1">{dish.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{dish.restaurant}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#E94057]">₦{dish.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500">{dish.prepTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          {!searchQuery && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#102542] mb-3">Recent Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchQuery(search)}
                      className="hover:bg-gradient-to-r hover:from-[#8A2387]/10 hover:to-[#E94057]/10"
                    >
                      <Clock className="h-3 w-3 mr-2" />
                      {search}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#102542] mb-3">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchQuery(search)}
                      className="hover:bg-gradient-to-r hover:from-[#8A2387]/10 hover:to-[#E94057]/10"
                    >
                      <TrendingUp className="h-3 w-3 mr-2" />
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'trending' && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-[#E94057]" />
            <span className="text-lg font-semibold text-[#102542]">Most Popular This Week</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDishes.map((dish) => (
              <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md group">
                <div className="relative">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-[#E94057] to-[#F27121] hover:from-[#E94057] hover:to-[#F27121]">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                  <Badge className="absolute top-3 right-3 bg-white text-gray-900 hover:bg-white">
                    {dish.rating}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-[#102542] mb-1">{dish.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{dish.restaurant}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#E94057]">₦{dish.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">{dish.prepTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchTab;
