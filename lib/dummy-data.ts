import { KPIData, ChartData, TableData } from '@/types/dashboard';

export const kpiData: KPIData[] = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up',
    icon: 'DollarSign'
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+180.1%',
    trend: 'up',
    icon: 'Users'
  },
  {
    title: 'Total Orders',
    value: '12,234',
    change: '+19%',
    trend: 'up',
    icon: 'CreditCard'
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '-4.3%',
    trend: 'down',
    icon: 'Activity'
  }
];

export const chartData: ChartData[] = [
  {
    name: 'Jan', revenue: 4000, users: 2400, orders: 240,
    value: 0
  },
  {
    name: 'Feb', revenue: 3000, users: 1398, orders: 221,
    value: 0
  },
  {
    name: 'Mar', revenue: 2000, users: 9800, orders: 229,
    value: 0
  },
  {
    name: 'Apr', revenue: 2780, users: 3908, orders: 200,
    value: 0
  },
  {
    name: 'May', revenue: 1890, users: 4800, orders: 218,
    value: 0
  },
  {
    name: 'Jun', revenue: 2390, users: 3800, orders: 250,
    value: 0
  },
  {
    name: 'Jul', revenue: 3490, users: 4300, orders: 210,
    value: 0
  }
];

export const tableData: TableData[] = [
  {
    id: '1',
    customer: 'John Doe',
    email: 'john@example.com',
    amount: 316,
    status: 'completed',
    date: '2024-01-15'
  },
  {
    id: '2',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    amount: 242,
    status: 'pending',
    date: '2024-01-14'
  },
  {
    id: '3',
    customer: 'Bob Johnson',
    email: 'bob@example.com',
    amount: 837,
    status: 'completed',
    date: '2024-01-13'
  },
  {
    id: '4',
    customer: 'Alice Brown',
    email: 'alice@example.com',
    amount: 174,
    status: 'failed',
    date: '2024-01-12'
  },
  {
    id: '5',
    customer: 'Charlie Wilson',
    email: 'charlie@example.com',
    amount: 721,
    status: 'completed',
    date: '2024-01-11'
  },
  {
    id: '6',
    customer: "Emily Davis",
    email: "emily@example.com",
    amount: 455,
    status: "pending",
    date: "2024-01-09",
  },
  {
    id: '7',
    customer: "Michael Scott",
    email: "michael@example.com",
    amount: 690,
    status: "completed",
    date: "2024-01-08",
  },
  {
    id: '8',
    customer: "Olivia Taylor",
    email: "olivia@example.com",
    amount: 312,
    status: "failed",
    date: "2024-01-07",
  },
  {
    id: '9',
    customer: "David Miller",
    email: "david@example.com",
    amount: 785,
    status: "completed",
    date: "2024-01-06",
  },
  {
    id: '10',
    customer: "Sophia Anderson",
    email: "sophia@example.com",
    amount: 220,
    status: "pending",
    date: "2024-01-05",
  },
];

export const userGrowthSources: ChartData[] = [
  { name: 'Organic', value: 60},
  { name: 'Marketing', value: 20},
  { name: 'Referrals', value: 10 },
  { name: 'Social Media', value: 5}
];