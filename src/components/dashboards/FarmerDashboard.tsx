import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Timeline, timelineConfigs } from '@/components/Timeline';
import { MapPin, Thermometer, Droplets, Leaf, Camera, Send, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HerbCollection {
  id: string;
  herbName: string;
  quantity: number;
  location: string;
  coordinates: string;
  soilMoisture: number;
  soilPH: number;
  weather: string;
  richness: number;
  date: string;
  status: 'collected' | 'sent' | 'accepted' | 'rejected';
  images: string[];
}

const mockCollections: HerbCollection[] = [
  {
    id: '1',
    herbName: 'Turmeric',
    quantity: 25,
    location: 'Field A, Green Valley',
    coordinates: '40.7128, -74.0060',
    soilMoisture: 68,
    soilPH: 6.8,
    weather: 'Sunny, 24°C',
    richness: 85,
    date: '2024-01-15',
    status: 'accepted',
    images: ['turmeric1.jpg', 'turmeric2.jpg']
  },
  {
    id: '2',
    herbName: 'Ginger',
    quantity: 30,
    location: 'Field B, Green Valley',
    coordinates: '40.7130, -74.0065',
    soilMoisture: 72,
    soilPH: 6.5,
    weather: 'Cloudy, 22°C',
    richness: 92,
    date: '2024-01-18',
    status: 'sent',
    images: ['ginger1.jpg']
  }
];

export function FarmerDashboard() {
  const [collections] = useState<HerbCollection[]>(mockCollections);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    herbName: '',
    quantity: '',
    location: '',
    soilMoisture: '',
    soilPH: '',
    weather: '',
    richness: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Collection Recorded!",
      description: `${formData.herbName} batch has been logged successfully.`,
    });
    setShowForm(false);
    setFormData({
      herbName: '',
      quantity: '',
      location: '',
      soilMoisture: '',
      soilPH: '',
      weather: '',
      richness: '',
      notes: ''
    });
  };

  const sendToTesting = (collectionId: string) => {
    toast({
      title: "Sent to Testing",
      description: "Herb batch has been sent to Pure Test Labs.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-farmer text-farmer-foreground';
      case 'sent': return 'bg-testing text-testing-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-farmer rounded-xl p-6 text-white">
        <h1 className="text-3xl font-orbitron font-bold mb-2">
          🌱 Farmer Dashboard
        </h1>
        <p className="text-lg opacity-90">
          Green Valley Farms • License: FAR-2024-001
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-1">
          <Timeline steps={timelineConfigs.farmer} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Collections
                  </p>
                  <p className="text-2xl font-bold">147</p>
                </div>
                <Leaf className="h-8 w-8 text-farmer" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    This Month
                  </p>
                  <p className="text-2xl font-bold">23</p>
                </div>
                <History className="h-8 w-8 text-farmer" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Acceptance Rate
                  </p>
                  <p className="text-2xl font-bold">96%</p>
                </div>
                <Badge className="bg-farmer text-farmer-foreground">
                  Excellent
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button 
                  onClick={() => setShowForm(true)}
                  className="btn-farmer glow-farmer"
                >
                  <Leaf className="mr-2 h-4 w-4" />
                  New Collection
                </Button>
                <Button variant="outline">
                  <MapPin className="mr-2 h-4 w-4" />
                  View Map
                </Button>
                <Button variant="outline">
                  <Camera className="mr-2 h-4 w-4" />
                  Upload Images
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Collection History */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron">Recent Collections</CardTitle>
              <CardDescription>
                Your herb collection history with tracking status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {collections.map((collection) => (
                  <div key={collection.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold font-orbitron">
                          {collection.herbName}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {collection.quantity}kg • {collection.location}
                        </p>
                      </div>
                      <Badge className={getStatusColor(collection.status)}>
                        {collection.status.charAt(0).toUpperCase() + collection.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span>Moisture: {collection.soilMoisture}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-orange-500" />
                        <span>pH: {collection.soilPH}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-500" />
                        <span>Rich: {collection.richness}%</span>
                      </div>
                      <div className="text-muted-foreground">
                        {collection.date}
                      </div>
                    </div>
                    
                    {collection.status === 'collected' && (
                      <Button 
                        size="sm" 
                        onClick={() => sendToTesting(collection.id)}
                        className="btn-farmer"
                      >
                        <Send className="mr-2 h-3 w-3" />
                        Send to Testing
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New Collection Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="font-orbitron">New Herb Collection</CardTitle>
              <CardDescription>
                Record herb collection with geo-tagging and sensor data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="herbName">Herb Name</Label>
                    <Input
                      id="herbName"
                      value={formData.herbName}
                      onChange={(e) => setFormData({...formData, herbName: e.target.value})}
                      placeholder="e.g., Turmeric"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (kg)</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      placeholder="25"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="Field A, Green Valley"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="soilMoisture">Soil Moisture (%)</Label>
                    <Input
                      id="soilMoisture"
                      type="number"
                      value={formData.soilMoisture}
                      onChange={(e) => setFormData({...formData, soilMoisture: e.target.value})}
                      placeholder="68"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="soilPH">Soil pH</Label>
                    <Input
                      id="soilPH"
                      type="number"
                      step="0.1"
                      value={formData.soilPH}
                      onChange={(e) => setFormData({...formData, soilPH: e.target.value})}
                      placeholder="6.8"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="richness">Soil Richness (%)</Label>
                    <Input
                      id="richness"
                      type="number"
                      value={formData.richness}
                      onChange={(e) => setFormData({...formData, richness: e.target.value})}
                      placeholder="85"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weather">Weather Conditions</Label>
                  <Input
                    id="weather"
                    value={formData.weather}
                    onChange={(e) => setFormData({...formData, weather: e.target.value})}
                    placeholder="Sunny, 24°C, Light breeze"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Any additional observations..."
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="btn-farmer glow-farmer">
                    Record Collection
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}