// Database schema types for Supabase
// This file defines the TypeScript types that match our Supabase database schema

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image_url: string;
  badges: string[];
  category: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

// For creating new products (without id and timestamps)
export type NewProduct = Omit<Product, 'id' | 'created_at' | 'updated_at'>;

// For creating new contact submissions (without id and timestamp)
export type NewContactSubmission = Omit<ContactSubmission, 'id' | 'created_at'>;

// Database table names
export const TABLES = {
  PRODUCTS: 'products',
  CONTACT_SUBMISSIONS: 'contact_submissions',
} as const;

// Product categories
export const PRODUCT_CATEGORIES = [
  'footwear',
  'apparel', 
  'accessories',
  'equipment',
  'originals'
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

// Utility type for API responses
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

// Stats interface for admin dashboard
export interface AdminStats {
  totalProducts: number;
  totalMessages: number;
  revenue: number;
  recentActivity: {
    products: Product[];
    messages: ContactSubmission[];
  };
}