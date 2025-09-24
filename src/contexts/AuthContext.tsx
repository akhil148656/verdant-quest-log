import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'farmer' | 'testing' | 'manufacturing' | 'packaging' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  license?: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for each role
const demoUsers: Record<UserRole, User> = {
  farmer: {
    id: '1',
    name: 'John Green',
    email: 'farmer@herbchain.com',
    role: 'farmer',
    license: 'FAR-2024-001',
    company: 'Green Valley Farms'
  },
  testing: {
    id: '2',
    name: 'Dr. Sarah Blue',
    email: 'testing@herbchain.com',
    role: 'testing',
    license: 'LAB-2024-002',
    company: 'Pure Test Labs'
  },
  manufacturing: {
    id: '3',
    name: 'Mike Orange',
    email: 'manufacturing@herbchain.com',
    role: 'manufacturing',
    license: 'MAN-2024-003',
    company: 'Herbal Solutions Inc'
  },
  packaging: {
    id: '4',
    name: 'Lisa Violet',
    email: 'packaging@herbchain.com',
    role: 'packaging',
    license: 'PAK-2024-004',
    company: 'Premium Pack Co'
  },
  admin: {
    id: '5',
    name: 'Alex Admin',
    email: 'admin@herbchain.com',
    role: 'admin',
    license: 'ADM-2024-005',
    company: 'HerbChain Platform'
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('herbchain_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // Demo login - in real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const demoUser = demoUsers[role];
    if (email === demoUser.email && password === 'demo123') {
      setUser(demoUser);
      localStorage.setItem('herbchain_user', JSON.stringify(demoUser));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('herbchain_user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}