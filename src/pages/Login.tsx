import React, { useState } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Leaf, FlaskConical, Factory, Package, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const roleIcons = {
  farmer: Leaf,
  testing: FlaskConical,
  manufacturing: Factory,
  packaging: Package,
  admin: Shield
};

const roleDescriptions = {
  farmer: 'Track herb collection with geo-tagging and sensor data',
  testing: 'Verify quality and generate certification codes',
  manufacturing: 'Process herbs into products with full traceability',
  packaging: 'Create final QR codes for consumer transparency',
  admin: 'Monitor all operations and audit supply chain'
};

const demoCredentials = {
  farmer: { email: 'farmer@herbchain.com', password: 'demo123' },
  testing: { email: 'testing@herbchain.com', password: 'demo123' },
  manufacturing: { email: 'manufacturing@herbchain.com', password: 'demo123' },
  packaging: { email: 'packaging@herbchain.com', password: 'demo123' },
  admin: { email: 'admin@herbchain.com', password: 'demo123' }
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      toast({
        variant: "destructive",
        title: "Role Required",
        description: "Please select a role to continue."
      });
      return;
    }

    try {
      await login(email, password, selectedRole);
      toast({
        title: "Welcome to HerbChain!",
        description: `Successfully logged in as ${selectedRole}.`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid credentials. Please try again."
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-orbitron font-bold text-primary mb-2">
            🌿 HerbChain
          </h1>
          <p className="text-xl text-muted-foreground font-exo">
            Transparent Herbal Supply Chain Platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Role Selection */}
          <div className="space-y-4">
            <h2 className="text-2xl font-orbitron font-semibold text-center mb-6">
              Select Your Role
            </h2>
            
            <div className="grid gap-3">
              {(Object.keys(roleIcons) as UserRole[]).map((role) => {
                const Icon = roleIcons[role];
                const isSelected = selectedRole === role;
                
                return (
                  <Card 
                    key={role}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      isSelected 
                        ? `bg-${role}-muted border-${role} shadow-${role}` 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handleRoleSelect(role)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          isSelected 
                            ? `bg-${role} text-${role}-foreground` 
                            : 'bg-muted'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-orbitron font-medium capitalize">
                            {role}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {roleDescriptions[role]}
                          </p>
                        </div>
                        {isSelected && (
                          <div className={`h-3 w-3 rounded-full bg-${role}`} />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="font-orbitron">Demo Login</CardTitle>
              <CardDescription>
                Select a role to auto-fill credentials, then click login
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={selectedRole} onValueChange={(value: UserRole) => handleRoleSelect(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(roleIcons) as UserRole[]).map((role) => (
                        <SelectItem key={role} value={role} className="capitalize">
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className={`w-full ${selectedRole ? `btn-${selectedRole} glow-${selectedRole}` : ''}`}
                  disabled={isLoading || !selectedRole}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    `Login as ${selectedRole ? selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1) : 'User'}`
                  )}
                </Button>
              </form>

              {selectedRole && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium font-orbitron mb-2">Demo Credentials:</h4>
                  <p className="text-sm text-muted-foreground">
                    Email: {demoCredentials[selectedRole].email}<br />
                    Password: {demoCredentials[selectedRole].password}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}