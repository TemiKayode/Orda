
import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface LocationBannerProps {
  location: string;
  onLocationChange: (location: string) => void;
}

const LocationBanner = ({ location, onLocationChange }: LocationBannerProps) => {
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  
  const cities = [
    'Lagos, Nigeria',
    'Abuja, Nigeria', 
    'Port Harcourt, Nigeria',
    'Kano, Nigeria',
    'Ibadan, Nigeria',
    'Osogbo, Osun State'
  ];

  const handleLocationSelect = (newLocation: string) => {
    onLocationChange(newLocation);
    setShowLocationPicker(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setShowLocationPicker(!showLocationPicker)}
        className="flex items-center text-white hover:bg-white/10 mb-4"
      >
        <MapPin className="h-4 w-4 mr-2" />
        <span className="mr-2">Delivering to {location}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {showLocationPicker && (
        <Card className="absolute top-12 left-0 w-64 z-10 border-0 shadow-lg">
          <CardContent className="p-2">
            <div className="text-sm font-medium text-[#102542] p-2 border-b">
              Select your location
            </div>
            {cities.map((city) => (
              <Button
                key={city}
                variant="ghost"
                className="w-full justify-start text-left p-2 hover:bg-gray-100"
                onClick={() => handleLocationSelect(city)}
              >
                <MapPin className="h-4 w-4 mr-2 text-[#F67160]" />
                {city}
              </Button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LocationBanner;
