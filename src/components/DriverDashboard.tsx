
import { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, CheckCircle, XCircle, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface DeliveryTask {
  id: string;
  restaurantName: string;
  customerName: string;
  customerPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  orderTotal: number;
  deliveryFee: number;
  status: 'pending' | 'accepted' | 'picked_up' | 'delivered';
  estimatedTime: string;
  distance: string;
}

const DriverDashboard = () => {
  const [availableTasks, setAvailableTasks] = useState<DeliveryTask[]>([
    {
      id: '1',
      restaurantName: 'Embassy Restaurant',
      customerName: 'John Doe',
      customerPhone: '+234 801 234 5678',
      pickupAddress: 'Embassy Restaurant, Old Garage, Osogbo',
      deliveryAddress: '123 Oke-Fia, Osogbo, Osun State',
      orderTotal: 3500,
      deliveryFee: 500,
      status: 'pending',
      estimatedTime: '25 mins',
      distance: '2.5 km'
    },
    {
      id: '2',
      restaurantName: 'BT Barbecue',
      customerName: 'Jane Smith',
      customerPhone: '+234 802 345 6789',
      pickupAddress: 'BT Barbecue, Gbodofon, Osogbo',
      deliveryAddress: '456 Alekuwodo, Osogbo, Osun State',
      orderTotal: 2800,
      deliveryFee: 500,
      status: 'pending',
      estimatedTime: '20 mins',
      distance: '1.8 km'
    }
  ]);

  const [myTasks, setMyTasks] = useState<DeliveryTask[]>([]);
  const [isOnline, setIsOnline] = useState(false);
  const { currentUser } = useAuth();

  const acceptTask = (taskId: string) => {
    const task = availableTasks.find(t => t.id === taskId);
    if (task) {
      const acceptedTask = { ...task, status: 'accepted' as const };
      setMyTasks([...myTasks, acceptedTask]);
      setAvailableTasks(availableTasks.filter(t => t.id !== taskId));
    }
  };

  const updateTaskStatus = (taskId: string, newStatus: DeliveryTask['status']) => {
    setMyTasks(myTasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500 hover:bg-yellow-500';
      case 'accepted': return 'bg-blue-500 hover:bg-blue-500';
      case 'picked_up': return 'bg-orange-500 hover:bg-orange-500';
      case 'delivered': return 'bg-green-500 hover:bg-green-500';
      default: return 'bg-gray-500 hover:bg-gray-500';
    }
  };

  const todayEarnings = myTasks
    .filter(task => task.status === 'delivered')
    .reduce((total, task) => total + task.deliveryFee, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#102542]">Driver Dashboard</h1>
              <p className="text-gray-600">Manage your deliveries</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={isOnline ? 'bg-green-500 hover:bg-green-500' : 'bg-red-500 hover:bg-red-500'}>
                {isOnline ? 'Online' : 'Offline'}
              </Badge>
              <Button
                onClick={() => setIsOnline(!isOnline)}
                variant={isOnline ? 'destructive' : 'default'}
                className={!isOnline ? 'bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387]/90 hover:to-[#E94057]/90' : ''}
              >
                {isOnline ? 'Go Offline' : 'Go Online'}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Today's Earnings</p>
                <p className="text-2xl font-bold text-[#E94057]">₦{todayEarnings.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-[#102542]">
                  {myTasks.filter(t => t.status === 'delivered').length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-[#102542]">
                  {myTasks.filter(t => t.status !== 'delivered').length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-[#102542]">{availableTasks.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Tasks */}
          <div>
            <h2 className="text-xl font-bold text-[#102542] mb-4">Available Deliveries</h2>
            <div className="space-y-4">
              {availableTasks.map((task) => (
                <Card key={task.id} className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-[#102542]">{task.restaurantName}</h3>
                        <p className="text-sm text-gray-600">{task.customerName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#E94057]">₦{task.deliveryFee}</p>
                        <p className="text-sm text-gray-600">{task.distance}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{task.pickupAddress}</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{task.deliveryAddress}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{task.estimatedTime}</span>
                      </div>
                      <Button
                        onClick={() => acceptTask(task.id)}
                        className="bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387]/90 hover:to-[#E94057]/90"
                        disabled={!isOnline}
                      >
                        Accept
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* My Tasks */}
          <div>
            <h2 className="text-xl font-bold text-[#102542] mb-4">My Deliveries</h2>
            <div className="space-y-4">
              {myTasks.map((task) => (
                <Card key={task.id} className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-[#102542]">{task.restaurantName}</h3>
                        <p className="text-sm text-gray-600">{task.customerName}</p>
                      </div>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{task.pickupAddress}</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{task.deliveryAddress}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{task.customerPhone}</span>
                      </div>
                      <div className="flex space-x-2">
                        {task.status === 'accepted' && (
                          <Button
                            size="sm"
                            onClick={() => updateTaskStatus(task.id, 'picked_up')}
                            className="bg-gradient-to-r from-[#8A2387] to-[#E94057] hover:from-[#8A2387]/90 hover:to-[#E94057]/90"
                          >
                            Picked Up
                          </Button>
                        )}
                        {task.status === 'picked_up' && (
                          <Button
                            size="sm"
                            onClick={() => updateTaskStatus(task.id, 'delivered')}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            Delivered
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Navigation className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
