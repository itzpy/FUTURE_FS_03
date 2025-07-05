'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ArrowUp, ArrowDown, DollarSign, ShoppingBag, Users, MessageCircle, Activity } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalMessages: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        // Fetch product count
        const { count: productCount, error: productError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });
        
        if (productError) throw productError;
        
        // Fetch message count
        const { count: messageCount, error: messageError } = await supabase
          .from('contact_submissions')
          .select('*', { count: 'exact', head: true });
        
        if (messageError) throw messageError;
        
        // Mock revenue data (in a real app, would come from orders table)
        const mockRevenue = Math.floor(Math.random() * 10000) + 5000;
        
        setStats({
          totalProducts: productCount || 0,
          totalMessages: messageCount || 0,
          revenue: mockRevenue
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDashboardData();
  }, []);

  // Mock data for charts and recent activities
  const recentProducts = [
    { id: 1, name: 'Ultra Boost AI', price: 189.95, date: '2023-08-15', status: 'active' },
    { id: 2, name: 'Cloudfoam Striker', price: 129.75, date: '2023-08-14', status: 'active' },
    { id: 3, name: 'Terrex Trail Pro', price: 149.65, date: '2023-08-12', status: 'active' }
  ];
  
  const recentMessages = [
    { id: 1, name: 'John Smith', email: 'john@example.com', subject: 'Product Inquiry', date: '2023-08-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', subject: 'Return Request', date: '2023-08-14' },
    { id: 3, name: 'Mike Davis', email: 'mike@example.com', subject: 'Feedback', date: '2023-08-12' }
  ];

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: ShoppingBag,
      color: 'bg-blue-500',
      link: '/admin/products'
    },
    {
      title: 'Customer Messages',
      value: stats.totalMessages,
      icon: MessageCircle,
      color: 'bg-purple-500',
      link: '/admin/messages'
    },
    {
      title: 'Revenue (Mock)',
      value: `$${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      link: '/admin/sales'
    },
    {
      title: 'Visitors (Mock)',
      value: '1,254',
      icon: Users,
      color: 'bg-orange-500',
      link: '/admin/analytics'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-heading font-bold mb-8">Dashboard</h1>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.link}
            className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-neutral-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-semibold mt-2">{stat.value}</h3>
                <p className="text-xs flex items-center mt-2">
                  <span className={`text-green-500 flex items-center`}>
                    <ArrowUp size={14} className="mr-1" />
                    12%
                  </span>
                  <span className="text-neutral-500 ml-1">vs last month</span>
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Activity Overview</h3>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          
          {/* Placeholder for chart */}
          <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center">
            <Activity className="h-8 w-8 text-neutral-300" />
            <span className="ml-2 text-neutral-400">Chart visualization would appear here</span>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-1">
              <p className="text-sm font-medium">New product added</p>
              <p className="text-xs text-neutral-500">Ultra Boost AI - $189.95</p>
              <p className="text-xs text-neutral-400">2 hours ago</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <p className="text-sm font-medium">New contact message</p>
              <p className="text-xs text-neutral-500">From: John Smith</p>
              <p className="text-xs text-neutral-400">3 hours ago</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4 py-1">
              <p className="text-sm font-medium">Website updated</p>
              <p className="text-xs text-neutral-500">Homepage hero section changed</p>
              <p className="text-xs text-neutral-400">Yesterday</p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4 py-1">
              <p className="text-sm font-medium">New review</p>
              <p className="text-xs text-neutral-500">5 stars for CloudFoam Striker</p>
              <p className="text-xs text-neutral-400">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Products & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Recent Products */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Recent Products</h3>
            <Link href="/admin/products" className="text-primary-600 hover:underline text-sm">
              View all
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left text-xs font-medium text-neutral-500">Name</th>
                  <th className="pb-2 text-left text-xs font-medium text-neutral-500">Price</th>
                  <th className="pb-2 text-left text-xs font-medium text-neutral-500">Added</th>
                  <th className="pb-2 text-left text-xs font-medium text-neutral-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map(product => (
                  <tr key={product.id} className="border-b last:border-0">
                    <td className="py-3 text-sm">{product.name}</td>
                    <td className="py-3 text-sm">${product.price}</td>
                    <td className="py-3 text-sm text-neutral-500">{product.date}</td>
                    <td className="py-3 text-sm">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Recent Messages */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Recent Messages</h3>
            <Link href="/admin/messages" className="text-primary-600 hover:underline text-sm">
              View all
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left text-xs font-medium text-neutral-500">Name</th>
                  <th className="pb-2 text-left text-xs font-medium text-neutral-500">Subject</th>
                  <th className="pb-2 text-left text-xs font-medium text-neutral-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentMessages.map(message => (
                  <tr key={message.id} className="border-b last:border-0">
                    <td className="py-3 text-sm">{message.name}</td>
                    <td className="py-3 text-sm">{message.subject}</td>
                    <td className="py-3 text-sm text-neutral-500">{message.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
