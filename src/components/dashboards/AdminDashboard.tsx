import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Users, Factory, FlaskConical, Package, QrCode, Search, TrendingUp } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  type: 'farmer' | 'testing' | 'manufacturing' | 'packaging';
  license: string;
  location: string;
  status: 'active' | 'pending' | 'suspended';
  transactionsCount: number;
}

interface Transaction {
  id: string;
  herbName: string;
  fromCompany: string;
  toCompany: string;
  fromType: string;
  toType: string;
  quantity: number;
  batchCode: string;
  status: 'completed' | 'pending' | 'rejected';
  date: string;
}

const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Green Valley Farms',
    type: 'farmer',
    license: 'FAR-2024-001',
    location: 'California, USA',
    status: 'active',
    transactionsCount: 147
  },
  {
    id: '2',
    name: 'Pure Test Labs',
    type: 'testing',
    license: 'LAB-2024-002',
    location: 'Oregon, USA',
    status: 'active',
    transactionsCount: 89
  },
  {
    id: '3',
    name: 'Herbal Solutions Inc',
    type: 'manufacturing',
    license: 'MAN-2024-003',
    location: 'Colorado, USA',
    status: 'active',
    transactionsCount: 56
  },
  {
    id: '4',
    name: 'Premium Pack Co',
    type: 'packaging',
    license: 'PAK-2024-004',
    location: 'Texas, USA',
    status: 'active',
    transactionsCount: 34
  }
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    herbName: 'Turmeric',
    fromCompany: 'Green Valley Farms',
    toCompany: 'Pure Test Labs',
    fromType: 'farmer',
    toType: 'testing',
    quantity: 25,
    batchCode: 'TU-2024-001',
    status: 'completed',
    date: '2024-01-20'
  },
  {
    id: '2',
    herbName: 'Ginger',
    fromCompany: 'Pure Test Labs',
    toCompany: 'Herbal Solutions Inc',
    fromType: 'testing',
    toType: 'manufacturing',
    quantity: 24,
    batchCode: 'GI-2024-002',
    status: 'pending',
    date: '2024-01-22'
  }
];

export function AdminDashboard() {
  const [companies] = useState<Company[]>(mockCompanies);
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const getCompanyIcon = (type: string) => {
    switch (type) {
      case 'farmer': return Users;
      case 'testing': return FlaskConical;
      case 'manufacturing': return Factory;
      case 'packaging': return Package;
      default: return Users;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'farmer': return 'farmer';
      case 'testing': return 'testing';
      case 'manufacturing': return 'manufacturing';
      case 'packaging': return 'packaging';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-farmer text-farmer-foreground';
      case 'pending': return 'bg-orange-500 text-white';
      case 'suspended': return 'bg-destructive text-destructive-foreground';
      case 'completed': return 'bg-farmer text-farmer-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted';
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.license.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || company.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-admin rounded-xl p-6 text-white">
        <h1 className="text-3xl font-orbitron font-bold mb-2">
          🛡️ Admin Control Center
        </h1>
        <p className="text-lg opacity-90">
          HerbChain Platform • Complete Supply Chain Oversight
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                Total Companies
              </p>
              <p className="text-2xl font-bold">{companies.length}</p>
            </div>
            <Shield className="h-8 w-8 text-admin" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                Total Transactions
              </p>
              <p className="text-2xl font-bold">326</p>
            </div>
            <TrendingUp className="h-8 w-8 text-admin" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                Active Batches
              </p>
              <p className="text-2xl font-bold">23</p>
            </div>
            <Package className="h-8 w-8 text-admin" />
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
            <QrCode className="h-8 w-8 text-admin" />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Company Registry */}
        <Card>
          <CardHeader>
            <CardTitle className="font-orbitron">Company Registry</CardTitle>
            <CardDescription>
              All registered companies across the supply chain
            </CardDescription>
            
            {/* Search and Filter */}
            <div className="flex gap-4 mt-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies or licenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="farmer">Farmers</SelectItem>
                  <SelectItem value="testing">Testing Labs</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="packaging">Packaging</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredCompanies.map((company) => {
                const CompanyIcon = getCompanyIcon(company.type);
                
                return (
                  <div key={company.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-${getTypeColor(company.type)} text-${getTypeColor(company.type)}-foreground`}>
                          <CompanyIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold font-orbitron">
                            {company.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {company.license} • {company.location}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(company.status)}>
                        {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <Badge variant="outline" className="capitalize">
                        {company.type}
                      </Badge>
                      <span className="text-muted-foreground">
                        {company.transactionsCount} transactions
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-orbitron">Recent Transactions</CardTitle>
            <CardDescription>
              Latest herb transfers across the supply chain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold font-orbitron">
                        {transaction.herbName}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {transaction.quantity}kg • {transaction.date}
                      </p>
                    </div>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`bg-${getTypeColor(transaction.fromType)}-muted`}>
                        {transaction.fromCompany}
                      </Badge>
                      <span>→</span>
                      <Badge variant="outline" className={`bg-${getTypeColor(transaction.toType)}-muted`}>
                        {transaction.toCompany}
                      </Badge>
                    </div>
                    <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                      {transaction.batchCode}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-orbitron">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="admin" className="glow-admin">
              <Shield className="mr-2 h-4 w-4" />
              Security Audit
            </Button>
            <Button variant="outline">
              <QrCode className="mr-2 h-4 w-4" />
              Verify QR Code
            </Button>
            <Button variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}