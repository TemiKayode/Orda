
import { useState } from 'react';
import { MapPin, User, Search, Menu, X, ShoppingCart, LogOut, Store, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface NavigationProps {
  onCartClick: () => void;
  onAuthClick?: () => void;
  currentUser?: any;
  onLogout?: () => void;
}

const Navigation = ({ onCartClick, onAuthClick, currentUser, onLogout }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-[#8A2387] to-[#E94057] bg-clip-text text-transparent">
              Orda
            </Link>
            <div className="hidden md:flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Osogbo, Osun State</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-[#E94057] font-medium transition-colors">Restaurants</a>
            <a href="#" className="text-gray-700 hover:text-[#E94057] font-medium transition-colors">Supermarkets</a>
            <Link to="/seller" className="text-gray-700 hover:text-[#E94057] font-medium transition-colors">Seller</Link>
            <Link to="/driver" className="text-gray-700 hover:text-[#E94057] font-medium transition-colors">Driver</Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative hover:bg-gradient-to-r hover:from-[#8A2387]/10 hover:to-[#E94057]/10"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387] hover:to-[#E94057] text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>
            
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Hello, {currentUser.email?.split('@')[0]}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onLogout}
                  className="hover:bg-gradient-to-r hover:from-[#8A2387]/10 hover:to-[#E94057]/10"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:bg-gradient-to-r hover:from-[#8A2387]/10 hover:to-[#E94057]/10"
                onClick={onAuthClick}
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative" onClick={onCartClick}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387] hover:to-[#E94057] text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
