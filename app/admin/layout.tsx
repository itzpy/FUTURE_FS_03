'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasSupabaseConfig] = useState(!!process.env.NEXT_PUBLIC_SUPABASE_URL && 
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  
  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: Package
    },
    {
      name: 'Customers',
      href: '/admin/customers',
      icon: Users
    },
    {
      name: 'Messages',
      href: '/admin/messages',
      icon: MessageSquare
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings
    }
  ];

  // If Supabase is not configured, show a warning message
  if (!hasSupabaseConfig) {
    return (
      <div className="flex min-h-screen bg-neutral-100 justify-center items-center">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">⚠️ Admin Panel Not Available</h1>
          <p className="mb-4">Supabase environment variables are not configured properly.</p>
          <p className="mb-6 text-sm text-gray-500">Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.</p>
          <Link href="/" className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">
            Return to Home Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-heading font-bold text-gradient">Abibas</span>
            <span className="text-sm bg-primary-600 text-white px-2 py-0.5 rounded ml-1">Admin</span>
          </Link>
          <button 
            className="lg:hidden p-1 rounded-full hover:bg-neutral-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Sidebar navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-4 py-2 rounded-lg group transition-colors
                      ${isActive 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-neutral-600 hover:bg-neutral-50'}
                    `}
                  >
                    <item.icon 
                      className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-700' : 'text-neutral-400 group-hover:text-neutral-500'}`} 
                    />
                    <span>{item.name}</span>
                    {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          <div className="mt-8 pt-4 border-t border-neutral-200">
            <Link
              href="/"
              className="flex items-center px-4 py-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5 text-neutral-400" />
              <span>Exit Admin</span>
            </Link>
          </div>
        </nav>
      </aside>
      
      {/* Main content */}
      <div className="flex-1">
        {/* Top header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-4">
          <button 
            className="p-1 rounded-full hover:bg-neutral-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative">
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white font-medium">
                A
              </div>
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs text-neutral-500">admin@abibas.com</div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
