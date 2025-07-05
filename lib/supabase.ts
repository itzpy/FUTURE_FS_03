import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for the entire app
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Type definitions for products
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image_url: string;
  badges: string[];
  category: string;
  created_at?: string;
};

// Type for contact form submissions
export type ContactSubmission = {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
};

// Fetch all products from Supabase
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data || [];
}

// Fetch products by category
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('id', { ascending: true });
  
  if (error) {
    console.error(`Error fetching ${category} products:`, error);
    return [];
  }
  
  return data || [];
}

// Submit contact form
export async function submitContactForm(submission: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<boolean> {
  const { error } = await supabase
    .from('contact_submissions')
    .insert([submission]);
  
  if (error) {
    console.error('Error submitting contact form:', error);
    return false;
  }
  
  return true;
}
