import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">
            Manage and view all your orders here.
          </p>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p className="text-muted-foreground">Orders page content coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
}