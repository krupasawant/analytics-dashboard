import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { KPICards } from '@/components/dashboard/kpi-cards';
import { Charts } from '@/components/dashboard/charts';
import { DataTable } from '@/components/dashboard/data-table';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground">
            Here's what's happening with your business today.
          </p>
        </div>
        
        <KPICards />
        
        <Charts />
        
        <DataTable />
      </div>
    </DashboardLayout>
  );
}