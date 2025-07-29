export interface KPIData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface ChartData {
  name: string;
  value?: number;
  revenue?: number;
  users?: number;
  orders?: number;
}

export interface TableData {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}