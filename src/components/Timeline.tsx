import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Circle, Leaf, FlaskConical, Factory, Package, User } from 'lucide-react';

interface TimelineStep {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'pending';
  icon: React.ElementType;
  color: string;
  description?: string;
  data?: Record<string, any>;
}

interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

const statusIcons = {
  completed: CheckCircle,
  current: Clock,
  pending: Circle
};

export function Timeline({ steps, className = '' }: TimelineProps) {
  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="p-6">
        <h3 className="text-lg font-orbitron font-semibold mb-6">Herb Journey Timeline</h3>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-6">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const StatusIcon = statusIcons[step.status];
              
              return (
                <div key={step.id} className="relative flex items-start space-x-4">
                  {/* Timeline dot */}
                  <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background ${
                    step.status === 'completed' 
                      ? `bg-${step.color} text-white`
                      : step.status === 'current'
                      ? `bg-${step.color}/20 border-${step.color} text-${step.color}`
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <StepIcon className="h-5 w-5" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0 pb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-orbitron font-medium text-sm">
                        {step.label}
                      </h4>
                      <Badge variant={
                        step.status === 'completed' 
                          ? 'default' 
                          : step.status === 'current'
                          ? 'secondary'
                          : 'outline'
                      } className="text-xs">
                        {step.status === 'completed' 
                          ? 'Completed' 
                          : step.status === 'current'
                          ? 'In Progress'
                          : 'Pending'
                        }
                      </Badge>
                    </div>
                    
                    {step.description && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {step.description}
                      </p>
                    )}
                    
                    {step.data && step.status === 'completed' && (
                      <div className="grid gap-2 text-xs">
                        {Object.entries(step.data).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Predefined timeline configurations for different roles
export const timelineConfigs = {
  farmer: [
    {
      id: 'collection',
      label: 'Herb Collection',
      status: 'current' as const,
      icon: Leaf,
      color: 'farmer',
      description: 'Collect herbs with geo-tagging and sensor data'
    },
    {
      id: 'testing',
      label: 'Quality Testing',
      status: 'pending' as const,
      icon: FlaskConical,
      color: 'testing',
      description: 'Lab verification and certification'
    },
    {
      id: 'manufacturing',
      label: 'Manufacturing',
      status: 'pending' as const,
      icon: Factory,
      color: 'manufacturing',
      description: 'Process into final products'
    },
    {
      id: 'packaging',
      label: 'Packaging',
      status: 'pending' as const,
      icon: Package,
      color: 'packaging',
      description: 'Final QR code generation'
    }
  ],
  
  testing: [
    {
      id: 'collection',
      label: 'Herb Collection',
      status: 'completed' as const,
      icon: Leaf,
      color: 'farmer',
      description: 'Herbs collected and transported',
      data: {
        farmer: 'Green Valley Farms',
        quantity: '50kg',
        geoLocation: '40.7128, -74.0060'
      }
    },
    {
      id: 'testing',
      label: 'Quality Testing',
      status: 'current' as const,
      icon: FlaskConical,
      color: 'testing',
      description: 'Currently testing herb quality and purity'
    },
    {
      id: 'manufacturing',
      label: 'Manufacturing',
      status: 'pending' as const,
      icon: Factory,
      color: 'manufacturing',
      description: 'Awaiting test completion'
    },
    {
      id: 'packaging',
      label: 'Packaging',
      status: 'pending' as const,
      icon: Package,
      color: 'packaging',
      description: 'Final QR code generation'
    }
  ],
  
  manufacturing: [
    {
      id: 'collection',
      label: 'Herb Collection',
      status: 'completed' as const,
      icon: Leaf,
      color: 'farmer',
      description: 'Herbs collected from certified farms',
      data: {
        farmer: 'Green Valley Farms',
        quantity: '50kg',
        soilPH: '6.8'
      }
    },
    {
      id: 'testing',
      label: 'Quality Testing',
      status: 'completed' as const,
      icon: FlaskConical,
      color: 'testing',
      description: 'Quality verified and certified',
      data: {
        lab: 'Pure Test Labs',
        purity: '98.5%',
        batchCode: 'HB-2024-001'
      }
    },
    {
      id: 'manufacturing',
      label: 'Manufacturing',
      status: 'current' as const,
      icon: Factory,
      color: 'manufacturing',
      description: 'Processing herbs into products'
    },
    {
      id: 'packaging',
      label: 'Packaging',
      status: 'pending' as const,
      icon: Package,
      color: 'packaging',
      description: 'Awaiting manufacturing completion'
    }
  ],
  
  packaging: [
    {
      id: 'collection',
      label: 'Herb Collection',
      status: 'completed' as const,
      icon: Leaf,
      color: 'farmer',
      description: 'Source verified',
      data: {
        farmer: 'Green Valley Farms',
        geoTag: 'Verified'
      }
    },
    {
      id: 'testing',
      label: 'Quality Testing',
      status: 'completed' as const,
      icon: FlaskConical,
      color: 'testing',
      description: 'Lab certified',
      data: {
        purity: '98.5%',
        certified: 'Yes'
      }
    },
    {
      id: 'manufacturing',
      label: 'Manufacturing',
      status: 'completed' as const,
      icon: Factory,
      color: 'manufacturing',
      description: 'Product manufactured',
      data: {
        product: 'Herbal Wellness Tea',
        batch: 'HWT-2024-001'
      }
    },
    {
      id: 'packaging',
      label: 'Packaging',
      status: 'current' as const,
      icon: Package,
      color: 'packaging',
      description: 'Creating consumer QR codes'
    }
  ]
};