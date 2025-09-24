import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Timeline, timelineConfigs } from '@/components/Timeline';
import { Factory, Package, CheckCircle, Plus, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IncomingBatch {
  id: string;
  herbName: string;
  quantity: number;
  testingLab: string;
  batchCode: string;
  purity: number;
  quality: string;
  receivedDate: string;
  status: 'received' | 'processing' | 'completed';
}

interface Product {
  id: string;
  productName: string;
  herbs: Array<{
    name: string;
    quantity: number;
    batchCode: string;
  }>;
  totalQuantity: number;
  status: 'manufacturing' | 'completed';
  createdDate: string;
}

const mockIncomingBatches: IncomingBatch[] = [
  {
    id: '1',
    herbName: 'Turmeric',
    quantity: 24,
    testingLab: 'Pure Test Labs',
    batchCode: 'TU-2024-001',
    purity: 98.5,
    quality: 'Premium',
    receivedDate: '2024-01-21',
    status: 'completed'
  },
  {
    id: '2',
    herbName: 'Ginger',
    quantity: 28,
    testingLab: 'Pure Test Labs',
    batchCode: 'GI-2024-002',
    purity: 96.8,
    quality: 'High',
    receivedDate: '2024-01-23',
    status: 'received'
  }
];

const mockProducts: Product[] = [
  {
    id: '1',
    productName: 'Herbal Wellness Tea',
    herbs: [
      { name: 'Turmeric', quantity: 15, batchCode: 'TU-2024-001' },
      { name: 'Ginger', quantity: 10, batchCode: 'GI-2024-002' }
    ],
    totalQuantity: 25,
    status: 'completed',
    createdDate: '2024-01-22'
  }
];

export function ManufacturingDashboard() {
  const [incomingBatches] = useState<IncomingBatch[]>(mockIncomingBatches);
  const [products] = useState<Product[]>(mockProducts);
  const [showProductForm, setShowProductForm] = useState(false);
  const { toast } = useToast();

  const [productForm, setProductForm] = useState({
    productName: '',
    selectedHerbs: [] as Array<{id: string; quantity: number}>,
    description: ''
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Product Created!",
      description: `${productForm.productName} has been manufactured successfully.`,
    });
    setShowProductForm(false);
    setProductForm({
      productName: '',
      selectedHerbs: [],
      description: ''
    });
  };

  const sendToPackaging = (productId: string) => {
    toast({
      title: "Sent to Packaging",
      description: "Product batch has been sent to Premium Pack Co.",
    });
  };

  const verifyBatch = (batchId: string) => {
    toast({
      title: "Batch Verified",
      description: "Herb batch data matches testing records perfectly.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-farmer text-farmer-foreground';
      case 'processing': case 'manufacturing': return 'bg-manufacturing text-manufacturing-foreground';
      case 'received': return 'bg-testing text-testing-foreground';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-manufacturing rounded-xl p-6 text-white">
        <h1 className="text-3xl font-orbitron font-bold mb-2">
          🏭 Manufacturing Center
        </h1>
        <p className="text-lg opacity-90">
          Herbal Solutions Inc • License: MAN-2024-003
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-1">
          <Timeline steps={timelineConfigs.manufacturing} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Products Made
                  </p>
                  <p className="text-2xl font-bold">67</p>
                </div>
                <Factory className="h-8 w-8 text-manufacturing" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Herbs Processed
                  </p>
                  <p className="text-2xl font-bold">1.2T</p>
                </div>
                <CheckCircle className="h-8 w-8 text-manufacturing" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Efficiency Rate
                  </p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
                <Badge className="bg-manufacturing text-manufacturing-foreground">
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
                  onClick={() => setShowProductForm(true)}
                  variant="manufacturing"
                  className="glow-manufacturing"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Product
                </Button>
                <Button variant="outline">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Quality Check
                </Button>
                <Button variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Inventory
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Incoming Herb Batches */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron">Incoming Herb Batches</CardTitle>
              <CardDescription>
                Tested herbs from certified laboratories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomingBatches.map((batch) => (
                  <div key={batch.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold font-orbitron">
                          {batch.herbName}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {batch.quantity}kg from {batch.testingLab}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Batch: {batch.batchCode} • Received: {batch.receivedDate}
                        </p>
                      </div>
                      <Badge className={getStatusColor(batch.status)}>
                        {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                      </Badge>
                    </div>

                    {/* Test Results Verification */}
                    <div className="grid md:grid-cols-2 gap-4 text-sm mb-3 p-3 bg-testing-muted rounded-lg">
                      <div>
                        <span className="font-medium">Purity:</span> {batch.purity}%
                      </div>
                      <div>
                        <span className="font-medium">Quality:</span> {batch.quality}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {batch.status === 'received' && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => verifyBatch(batch.id)}
                            variant="testing"
                          >
                            <CheckCircle className="mr-2 h-3 w-3" />
                            Verify Data
                          </Button>
                          <Button 
                            size="sm" 
                            variant="manufacturing"
                          >
                            <Factory className="mr-2 h-3 w-3" />
                            Start Processing
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Manufactured Products */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron">Manufactured Products</CardTitle>
              <CardDescription>
                Products created from verified herb batches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold font-orbitron">
                          {product.productName}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Total Quantity: {product.totalQuantity}kg
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Created: {product.createdDate}
                        </p>
                      </div>
                      <Badge className={getStatusColor(product.status)}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </Badge>
                    </div>

                    {/* Herb Composition */}
                    <div className="space-y-2 mb-3">
                      <h5 className="font-medium text-sm">Herb Composition:</h5>
                      <div className="grid gap-2">
                        {product.herbs.map((herb, index) => (
                          <div key={index} className="flex items-center justify-between text-sm p-2 bg-muted/30 rounded">
                            <span>{herb.name}</span>
                            <div className="flex items-center gap-2">
                              <span>{herb.quantity}kg</span>
                              <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                                {herb.batchCode}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    {product.status === 'completed' && (
                      <Button 
                        size="sm" 
                        onClick={() => sendToPackaging(product.id)}
                        variant="packaging"
                      >
                        <Send className="mr-2 h-3 w-3" />
                        Send to Packaging
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Creation Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="font-orbitron">Create New Product</CardTitle>
              <CardDescription>
                Combine verified herb batches to create products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    value={productForm.productName}
                    onChange={(e) => setProductForm({...productForm, productName: e.target.value})}
                    placeholder="e.g., Herbal Wellness Tea"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Available Herb Batches</Label>
                  <div className="space-y-2 border rounded-lg p-4">
                    {incomingBatches
                      .filter(batch => batch.status === 'completed')
                      .map((batch) => (
                        <div key={batch.id} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <span className="font-medium">{batch.herbName}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              ({batch.quantity}kg available)
                            </span>
                          </div>
                          <Input
                            type="number"
                            placeholder="Qty"
                            className="w-20"
                            max={batch.quantity}
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Product Description</Label>
                  <Textarea
                    id="description"
                    value={productForm.description}
                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    placeholder="Describe the product composition and intended use..."
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button type="submit" variant="manufacturing" className="glow-manufacturing">
                    <Factory className="mr-2 h-4 w-4" />
                    Create Product
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowProductForm(false)}
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