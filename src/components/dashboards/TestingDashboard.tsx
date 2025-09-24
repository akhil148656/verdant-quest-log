import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Timeline, timelineConfigs } from '@/components/Timeline';
import { FlaskConical, CheckCircle, XCircle, AlertTriangle, QrCode, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IncomingHerb {
  id: string;
  herbName: string;
  quantity: number;
  farmer: string;
  farmerLicense: string;
  geoLocation: string;
  soilData: {
    moisture: number;
    pH: number;
    richness: number;
  };
  receivedDate: string;
  status: 'pending' | 'testing' | 'completed' | 'rejected';
  testResults?: {
    purity: number;
    quality: string;
    accepted: number;
    rejected: number;
    batchCode: string;
  };
}

const mockIncomingHerbs: IncomingHerb[] = [
  {
    id: '1',
    herbName: 'Turmeric',
    quantity: 25,
    farmer: 'Green Valley Farms',
    farmerLicense: 'FAR-2024-001',
    geoLocation: '40.7128, -74.0060',
    soilData: {
      moisture: 68,
      pH: 6.8,
      richness: 85
    },
    receivedDate: '2024-01-20',
    status: 'completed',
    testResults: {
      purity: 98.5,
      quality: 'Premium',
      accepted: 24,
      rejected: 1,
      batchCode: 'TU-2024-001'
    }
  },
  {
    id: '2',
    herbName: 'Ginger',
    quantity: 30,
    farmer: 'Green Valley Farms',
    farmerLicense: 'FAR-2024-001',
    geoLocation: '40.7130, -74.0065',
    soilData: {
      moisture: 72,
      pH: 6.5,
      richness: 92
    },
    receivedDate: '2024-01-22',
    status: 'testing'
  }
];

export function TestingDashboard() {
  const [incomingHerbs] = useState<IncomingHerb[]>(mockIncomingHerbs);
  const [selectedHerb, setSelectedHerb] = useState<IncomingHerb | null>(null);
  const { toast } = useToast();

  const [testData, setTestData] = useState({
    purity: '',
    quality: '',
    accepted: '',
    rejected: '',
    notes: ''
  });

  const handleTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const batchCode = `${selectedHerb?.herbName.substring(0, 2).toUpperCase()}-2024-${String(Math.floor(Math.random() * 900) + 100)}`;
    
    toast({
      title: "Test Results Recorded!",
      description: `Batch code ${batchCode} generated successfully.`,
    });
    
    setSelectedHerb(null);
    setTestData({
      purity: '',
      quality: '',
      accepted: '',
      rejected: '',
      notes: ''
    });
  };

  const sendToManufacturing = (herbId: string) => {
    toast({
      title: "Sent to Manufacturing",
      description: "Tested batch has been dispatched to Herbal Solutions Inc.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-farmer text-farmer-foreground';
      case 'testing': return 'bg-testing text-testing-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'testing': return FlaskConical;
      case 'rejected': return XCircle;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-testing rounded-xl p-6 text-white">
        <h1 className="text-3xl font-orbitron font-bold mb-2">
          🧪 Testing Laboratory
        </h1>
        <p className="text-lg opacity-90">
          Pure Test Labs • License: LAB-2024-002
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-1">
          <Timeline steps={timelineConfigs.testing} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Tests Completed
                  </p>
                  <p className="text-2xl font-bold">89</p>
                </div>
                <FlaskConical className="h-8 w-8 text-testing" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Average Purity
                  </p>
                  <p className="text-2xl font-bold">96.8%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-testing" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Pending Tests
                  </p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </CardContent>
            </Card>
          </div>

          {/* Incoming Herbs */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron">Incoming Herb Batches</CardTitle>
              <CardDescription>
                Herbs received from certified farmers awaiting testing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomingHerbs.map((herb) => {
                  const StatusIcon = getStatusIcon(herb.status);
                  
                  return (
                    <div key={herb.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold font-orbitron">
                            {herb.herbName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {herb.quantity}kg from {herb.farmer}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            License: {herb.farmerLicense} • Location: {herb.geoLocation}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusIcon className="h-4 w-4" />
                          <Badge className={getStatusColor(herb.status)}>
                            {herb.status.charAt(0).toUpperCase() + herb.status.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      {/* Soil Data */}
                      <div className="grid md:grid-cols-3 gap-4 text-sm mb-3 p-3 bg-muted/30 rounded-lg">
                        <div>
                          <span className="font-medium">Soil Moisture:</span> {herb.soilData.moisture}%
                        </div>
                        <div>
                          <span className="font-medium">pH Level:</span> {herb.soilData.pH}
                        </div>
                        <div>
                          <span className="font-medium">Richness:</span> {herb.soilData.richness}%
                        </div>
                      </div>

                      {/* Test Results */}
                      {herb.testResults && (
                        <div className="grid md:grid-cols-4 gap-4 text-sm mb-3 p-3 bg-testing-muted rounded-lg">
                          <div>
                            <span className="font-medium">Purity:</span> {herb.testResults.purity}%
                          </div>
                          <div>
                            <span className="font-medium">Quality:</span> {herb.testResults.quality}
                          </div>
                          <div>
                            <span className="font-medium">Accepted:</span> {herb.testResults.accepted}kg
                          </div>
                          <div className="flex items-center gap-2">
                            <QrCode className="h-3 w-3" />
                            <span className="font-mono text-xs">{herb.testResults.batchCode}</span>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        {herb.status === 'pending' && (
                          <Button 
                            size="sm" 
                            onClick={() => setSelectedHerb(herb)}
                            variant="testing"
                          >
                            <FlaskConical className="mr-2 h-3 w-3" />
                            Start Testing
                          </Button>
                        )}
                        {herb.status === 'completed' && (
                          <Button 
                            size="sm" 
                            onClick={() => sendToManufacturing(herb.id)}
                            variant="manufacturing"
                          >
                            <Send className="mr-2 h-3 w-3" />
                            Send to Manufacturing
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Testing Form Modal */}
      {selectedHerb && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="font-orbitron">Test Results - {selectedHerb.herbName}</CardTitle>
              <CardDescription>
                Record laboratory test results and generate batch code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTestSubmit} className="space-y-4">
                {/* Source Information */}
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <h4 className="font-medium font-orbitron">Source Information</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Farmer:</strong> {selectedHerb.farmer}</div>
                    <div><strong>License:</strong> {selectedHerb.farmerLicense}</div>
                    <div><strong>Quantity:</strong> {selectedHerb.quantity}kg</div>
                    <div><strong>Location:</strong> {selectedHerb.geoLocation}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="purity">Purity (%)</Label>
                    <Input
                      id="purity"
                      type="number"
                      step="0.1"
                      value={testData.purity}
                      onChange={(e) => setTestData({...testData, purity: e.target.value})}
                      placeholder="98.5"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quality">Quality Grade</Label>
                    <Input
                      id="quality"
                      value={testData.quality}
                      onChange={(e) => setTestData({...testData, quality: e.target.value})}
                      placeholder="Premium"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accepted">Quantity Accepted (kg)</Label>
                    <Input
                      id="accepted"
                      type="number"
                      value={testData.accepted}
                      onChange={(e) => setTestData({...testData, accepted: e.target.value})}
                      placeholder="24"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rejected">Quantity Rejected (kg)</Label>
                    <Input
                      id="rejected"
                      type="number"
                      value={testData.rejected}
                      onChange={(e) => setTestData({...testData, rejected: e.target.value})}
                      placeholder="1"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Test Notes</Label>
                  <Textarea
                    id="notes"
                    value={testData.notes}
                    onChange={(e) => setTestData({...testData, notes: e.target.value})}
                    placeholder="Laboratory observations and remarks..."
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button type="submit" variant="testing" className="glow-testing">
                    <QrCode className="mr-2 h-4 w-4" />
                    Generate Batch Code
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setSelectedHerb(null)}
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