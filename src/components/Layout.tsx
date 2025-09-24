import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { LogOut, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'farmer': return 'farmer';
      case 'testing': return 'testing';
      case 'manufacturing': return 'manufacturing';
      case 'packaging': return 'packaging';
      case 'admin': return 'admin';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-orbitron font-bold text-primary">
              🌿 HerbChain
            </h1>
            <Badge variant="outline" className="capitalize">
              {user.role} Portal
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className={`bg-${getRoleColor(user.role)} text-${getRoleColor(user.role)}-foreground`}>
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="font-medium font-orbitron">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.company}</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}