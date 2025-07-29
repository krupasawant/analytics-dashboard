'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { saveAs } from "file-saver";
import Papa from "papaparse";

import jsPDF from "jspdf";

import "jspdf-autotable";

import autoTable from "jspdf-autotable";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MoreHorizontal, 
  Search, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  Download,
  FileText
} from 'lucide-react';

import { tableData } from '@/lib/dummy-data';
import { TableData } from '@/types/dashboard';

const statusColors = {
  completed: 'bg-green-100 text-green-800 hover:bg-green-100',
  pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  failed: 'bg-red-100 text-red-800 hover:bg-red-100',
};

type SortField = 'customer' | 'amount' | 'date';
type SortDirection = 'asc' | 'desc';

export function DataTable() {
  const [data, setData] = useState<TableData[]>(tableData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortDirection === 'asc' ? 
      <ArrowUp className="h-4 w-4" /> : 
      <ArrowDown className="h-4 w-4" />;
  };

  const filteredAndSortedData = data
    .filter(
      (item) =>
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'customer':
          aValue = a.customer.toLowerCase();
          bValue = b.customer.toLowerCase();
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        default:
          return 0;
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const filteredData = data.filter(
    (item) =>
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate a random order
const generateRandomOrder = (): TableData => {
  const names = ["Liam", "Emma", "Noah", "Ava", "Ethan", "Isabella"];
  const lastNames = ["Brown", "Clark", "Lee", "Walker", "Hall"];
  const statuses = ["completed", "pending", "failed"] as const;
  type Status = typeof statuses[number];

  const randomName =
    names[Math.floor(Math.random() * names.length)] +
    " " +
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return {
    id: Date.now().toString(),
    customer: randomName,
    email: `${randomName.split(" ")[0].toLowerCase()}@example.com`,
    amount: Math.floor(Math.random() * 900) + 100,
    status: statuses[Math.floor(Math.random() * statuses.length)] as Status,
    date: new Date().toISOString(),
  };
};


useEffect(() => {
  const interval = setInterval(() => {
    setData((prevData) => {
      return [generateRandomOrder(), ...prevData];
    });
  }, 10000); // every 10 seconds

  return () => clearInterval(interval);
}, []);


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString));
  };

const exportToCSV = () => {
  const csv = Papa.unparse(filteredAndSortedData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "table-data.csv");
};

const exportToPDF = () => {
  const doc = new jsPDF();
  const tableColumn = ["Customer", "Email", "Amount", "Status", "Date"];
  const tableRows = filteredAndSortedData.map(row => [
    row.customer,
    row.email,
    row.amount,
    row.status,
    row.date,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
  });

  doc.save("table-data.pdf");
};




  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search customers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              disabled={filteredAndSortedData.length === 0}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>CSV</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToPDF}
              disabled={filteredAndSortedData.length === 0}
              className="flex items-center space-x-2"
            >
            <FileText className="h-4 w-4" />
            <span>PDF</span>
          </Button>

          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('customer')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Customer
                    {getSortIcon('customer')}
                  </Button>
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('amount')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Amount
                    {getSortIcon('amount')}
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('date')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Date
                    {getSortIcon('date')}
                  </Button>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {order.customer}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.email}
                  </TableCell>
                  <TableCell className="font-mono">
                    {formatCurrency(order.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className={statusColors[order.status]}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(order.date)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Copy order ID</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Refund order</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredAndSortedData.length} of {data.length} orders
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}