'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  ChevronLeft,
  CreditCard,
  DollarSign,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Users,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home, current: true },
  { name: 'Orders', href: '/orders', icon: ShoppingCart, current: false },
  { name: 'Products', href: '/products', icon: Package, current: false },
  { name: 'Customers', href: '/customers', icon: Users, current: false },
  { name: 'Revenue', href: '/revenue', icon: DollarSign, current: false },
  { name: 'Payments', href: '/payments', icon: CreditCard, current: false },
  { name: 'Settings', href: '/settings', icon: Settings, current: false },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      'relative flex h-full flex-col border-r bg-background transition-all duration-300',
      collapsed ? 'w-16' : 'w-64',
      className
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg">ADmyBRAND Insights</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          <ChevronLeft className={cn(
            'h-4 w-4 transition-transform',
            collapsed && 'rotate-180'
          )} />
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                item.current
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground',
                collapsed && 'justify-center'
              )}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && (
                <span className="ml-3">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}