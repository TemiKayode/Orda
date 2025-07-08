
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, DollarSign, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  category: string;
}

const SellerDashboard = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    available: true
  });
  const { currentUser } = useAuth();

  const handleAddItem = () => {
    const item: MenuItem = {
      id: Date.now().toString(),
      ...newItem,
      available: true
    };
    setMenuItems([...menuItems, item]);
    setNewItem({ name: '', description: '', price: 0, image: '', category: '', available: true });
    setShowAddForm(false);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      category: item.category,
      available: item.available
    });
    setShowAddForm(true);
  };

  const handleUpdateItem = () => {
    if (editingItem) {
      setMenuItems(menuItems.map(item => 
        item.id === editingItem.id 
          ? { ...editingItem, ...newItem }
          : item
      ));
      setEditingItem(null);
      setNewItem({ name: '', description: '', price: 0, image: '', category: '', available: true });
      setShowAddForm(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#102542]">Restaurant Dashboard</h1>
          <p className="text-gray-600">Manage your menu and orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Menu Items</p>
                  <p className="text-2xl font-bold text-[#102542]">{menuItems.length}</p>
                </div>
                <Package className="h-8 w-8 text-[#E94057]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Available Items</p>
                  <p className="text-2xl font-bold text-[#102542]">
                    {menuItems.filter(item => item.available).length}
                  </p>
                </div>
                <Badge className="bg-green-500 hover:bg-green-500">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Orders</p>
                  <p className="text-2xl font-bold text-[#102542]">12</p>
                </div>
                <DollarSign className="h-8 w-8 text-[#F27121]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Item Button */}
        <div className="mb-6">
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387]/90 hover:to-[#E94057]/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Item
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>{editingItem ? 'Edit Item' : 'Add New Menu Item'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Item name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                />
                <Input
                  placeholder="Category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                />
              </div>
              
              <Textarea
                placeholder="Description"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Price (₦)"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: Number(e.target.value)})}
                />
                <Input
                  placeholder="Image URL"
                  value={newItem.image}
                  onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                />
              </div>
              
              <div className="flex space-x-4">
                <Button
                  onClick={editingItem ? handleUpdateItem : handleAddItem}
                  className="bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387]/90 hover:to-[#E94057]/90"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingItem(null);
                    setNewItem({ name: '', description: '', price: 0, image: '', category: '', available: true });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img
                    src={item.image || 'https://placehold.co/300x200/E0E0E0/666666?text=🍽️'}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <Badge
                    className={`absolute top-2 right-2 ${
                      item.available ? 'bg-green-500 hover:bg-green-500' : 'bg-red-500 hover:bg-red-500'
                    }`}
                  >
                    {item.available ? 'Available' : 'Out of Stock'}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-[#102542] mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <p className="text-lg font-bold text-[#E94057] mb-4">₦{item.price.toLocaleString()}</p>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditItem(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleAvailability(item.id)}
                  >
                    {item.available ? 'Hide' : 'Show'}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
