import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timeline, timelineConfigs } from '@/components/Timeline';
import { Package, QrCode, CheckCircle, Eye, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IncomingProduct {
  id: string;
  productName: string;
  manufacturer: string;
  herbs: Array<{
    name: string;
    quantity: number;
    batchCode: string;
    farmer: string;
    geoLocation: string;
    purity: number;
  }>;
  totalQuantity: number;
  receivedDate: string;
  status: 'received' | 'verified' | 'packaged';
  finalQRCode?: string;
}

const mockIncomingProducts: IncomingProduct[] = [
  {
    id: '1',
    productName: 'Herbal Wellness Tea',
    manufacturer: 'Herbal Solutions Inc',
    herbs: [
      {
        name: 'Turmeric',
        quantity: 15,
        batchCode: 'TU-2024-001',
        farmer: 'Green Valley Farms',
        geoLocation: '40.7128, -74.0060',
        purity: 98.5
      },
      {
        name: 'Ginger',
        quantity: 10,
        batchCode: 'GI-2024-002',
        farmer: 'Green Valley Farms',
        geoLocation: '40.7130, -74.0065',
        purity: 96.8
      }
    ],
    totalQuantity: 25,
    receivedDate: '2024-01-24',
    status: 'packaged',
    finalQRCode: 'HWT-2024-FINAL-001'
  },
  {
    id: '2',
    productName: 'Immunity Boost Blend',
    manufacturer: 'Herbal Solutions Inc',
    herbs: [
      {
        name: 'Ashwagandha',
        quantity: 20,
        batchCode: 'AS-2024-003',
        farmer: 'Mountain Herbs Co',
        geoLocation: '39.7392, -104.9903',
        purity: 97.2
      }
    ],
    totalQuantity: 20,
    receivedDate: '2024-01-25',
    status: 'received'
  }
];

export function PackagingDashboard() {
  const [incomingProducts] = useState<IncomingProduct[]>(mockIncomingProducts);
  const [selectedProduct, setSelectedProduct] = useState<IncomingProduct | null>(null);
  const { toast } = useToast();

  const verifyHerbJourney = (productId: string) => {
    toast({
      title: "Journey Verified!",
      description: "Complete herb journey verified successfully. All data matches.",
    });
  };

  const generateFinalQR = (productId: string) => {
    const qrCode = `HWT-2024-FINAL-${String(Math.floor(Math.random() * 900) + 100)}`;
    toast({
      title: "QR Code Generated!",
      description: `Final consumer QR code ${qrCode} created successfully.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'packaged': return 'bg-farmer text-farmer-foreground';
      case 'verified': return 'bg-packaging text-packaging-foreground';
      case 'received': return 'bg-manufacturing text-manufacturing-foreground';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-packaging rounded-xl p-6 text-white">
        <h1 className="text-3xl font-orbitron font-bold mb-2">
          📦 Packaging Center
        </h1>
        <p className="text-lg opacity-90">
          Premium Pack Co • License: PAK-2024-004
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-1">
          <Timeline steps={timelineConfigs.packaging} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Products Packaged
                  </p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <Package className="h-8 w-8 text-packaging" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    QR Codes Generated
                  </p>
                  <p className="text-2xl font-bold">145</p>
                </div>
                <QrCode className="h-8 w-8 text-packaging" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Verification Rate
                  </p>
                  <p className="text-2xl font-bold">100%</p>
                </div>
                <Badge className="bg-packaging text-packaging-foreground">
                  Perfect
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
                <Button variant="packaging" className="glow-packaging">
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate QR Code
                </Button>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview Label
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Incoming Products */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron">Incoming Products</CardTitle>
              <CardDescription>
                Manufactured products ready for final packaging
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomingProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold font-orbitron">
                          {product.productName}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {product.totalQuantity}kg from {product.manufacturer}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Received: {product.receivedDate}
                        </p>
                      </div>
                      <Badge className={getStatusColor(product.status)}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </Badge>
                    </div>

                    {/* Herb Journey Summary */}
                    <div className="space-y-2 mb-4">
                      <h5 className="font-medium text-sm">Complete Herb Journey:</h5>
                      <div className="space-y-2">
                        {product.herbs.map((herb, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h6 className="font-medium">{herb.name}</h6>
                              <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                                {herb.batchCode}
                              </span>
                            </div>
                            <div className="grid md:grid-cols-4 gap-4 text-xs text-muted-foreground">
                              <div>
                                <strong>Farmer:</strong> {herb.farmer}
                              </div>
                              <div>
                                <strong>Location:</strong> {herb.geoLocation}
                              </div>
                              <div>
                                <strong>Quantity:</strong> {herb.quantity}kg
                              </div>
                              <div>
                                <strong>Purity:</strong> {herb.purity}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Final QR Code */}
                    {product.finalQRCode && (
                      <div className="p-3 bg-packaging-muted rounded-lg mb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-sm">Final Consumer QR Code:</span>
                            <div className="font-mono text-xs mt-1">{product.finalQRCode}</div>
                          </div>
                          <QrCode className="h-6 w-6 text-packaging" />
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      {product.status === 'received' && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => verifyHerbJourney(product.id)}
                            variant="testing"
                          >
                            <CheckCircle className="mr-2 h-3 w-3" />
                            Verify Journey
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => setSelectedProduct(product)}
                            variant="outline"
                          >
                            <Eye className="mr-2 h-3 w-3" />
                            View Details
                          </Button>
                        </>
                      )}
                      {product.status === 'verified' && (
                        <Button 
                          size="sm" 
                          onClick={() => generateFinalQR(product.id)}
                          variant="packaging"
                          className="glow-packaging"
                        >
                          <QrCode className="mr-2 h-3 w-3" />
                          Generate Final QR
                        </Button>
                      )}
                      {product.status === 'packaged' && (
                        <Badge className="bg-farmer text-farmer-foreground">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Ready for Consumer
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="font-orbitron">
                Complete Journey - {selectedProduct.productName}
              </CardTitle>
              <CardDescription>
                Full transparency from farm to consumer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {selectedProduct.herbs.map((herb, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-orbitron font-semibold mb-4">{herb.name} Journey</h4>
                    
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <h5 className="font-medium text-farmer">🌱 Farm Origin</h5>
                        <div className="text-sm space-y-1">
                          <div><strong>Farmer:</strong> {herb.farmer}</div>
                          <div><strong>Location:</strong> {herb.geoLocation}</div>
                          <div><strong>Quantity:</strong> {herb.quantity}kg</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-testing">🧪 Lab Testing</h5>
                        <div className="text-sm space-y-1">
                          <div><strong>Purity:</strong> {herb.purity}%</div>
                          <div><strong>Batch:</strong> {herb.batchCode}</div>
                          <div><strong>Status:</strong> Certified</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-manufacturing">🏭 Manufacturing</h5>
                        <div className="text-sm space-y-1">
                          <div><strong>Processed:</strong> Yes</div>
                          <div><strong>Product:</strong> {selectedProduct.productName}</div>
                          <div><strong>Used:</strong> {herb.quantity}kg</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-packaging">📦 Packaging</h5>
                        <div className="text-sm space-y-1">
                          <div><strong>Verified:</strong> ✓</div>
                          <div><strong>QR Ready:</strong> ✓</div>
                          <div><strong>Status:</strong> Complete</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={() => generateFinalQR(selectedProduct.id)}
                    variant="packaging" 
                    className="glow-packaging"
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    Generate Consumer QR
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedProduct(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}