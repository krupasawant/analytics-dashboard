import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DollarSign, 
  Users, 
  CreditCard, 
  Activity,
  TrendingUp,
  TrendingDown 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { kpiData } from '@/lib/dummy-data';

const iconMap = {
  DollarSign,
  Users,
  CreditCard,
  Activity,
};

export function KPICards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => {
        const Icon = iconMap[kpi.icon as keyof typeof iconMap];
        const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendIcon className={cn(
                  "mr-1 h-3 w-3",
                  kpi.trend === 'up' ? "text-green-600" : "text-red-600"
                )} />
                <span className={cn(
                  kpi.trend === 'up' ? "text-green-600" : "text-red-600"
                )}>
                  {kpi.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}