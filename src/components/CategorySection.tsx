
import { Card, CardContent } from '@/components/ui/card';

interface Category {
  name: string;
  icon: string;
  count: number;
}

interface CategorySectionProps {
  categories: Category[];
  onCategoryClick?: (category: string) => void;
  selectedCategory?: string | null;
}

const CategorySection = ({ categories, onCategoryClick, selectedCategory }: CategorySectionProps) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-[#102542] mb-6">What are you craving?</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <Card 
            key={index} 
            className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md group hover:scale-105 ${
              selectedCategory === category.name 
                ? 'bg-gradient-to-br from-[#8A2387]/20 to-[#E94057]/20 ring-2 ring-[#E94057]' 
                : 'hover:bg-gradient-to-br hover:from-[#8A2387]/10 hover:to-[#E94057]/10'
            }`}
            onClick={() => onCategoryClick?.(category.name)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className={`font-semibold mb-1 ${
                selectedCategory === category.name ? 'text-[#E94057]' : 'text-[#102542]'
              }`}>
                {category.name}
              </h3>
              <p className="text-xs text-gray-500">{category.count} options</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
