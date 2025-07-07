import { createClient } from '@supabase/supabase-js';
import { Product, ContactSubmission } from './models';

// Re-export types for convenience
export type { Product, ContactSubmission } from './models';

// Helper to check if we're in a browser context
const isBrowser = typeof window !== 'undefined';

// Get environment variables with validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// For static generation, provide fallback values
const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackKey = 'placeholder-key';

// Validate required environment variables - use fallbacks during build
if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
    // During static generation, use placeholder values
    console.warn('Using placeholder Supabase values for static generation');
  } else {
    throw new Error(
      'Missing Supabase environment variables. Please check your .env.local file.'
    );
  }
}

// Create a single supabase client for the entire app
const supabase = createClient(
  supabaseUrl || fallbackUrl, 
  supabaseAnonKey || fallbackKey, 
  {
  auth: {
    persistSession: isBrowser,
    autoRefreshToken: isBrowser,
  },
});

export { supabase };
export default supabase;

// Fetch all products from Supabase with improved error handling
export async function fetchProducts(): Promise<Product[]> {
  // Return empty array during static generation
  if (typeof window === 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    
    return data || [];
  } catch (err) {
    console.error('Exception fetching products:', err);
    return [];
  }
}

// Fetch products by category
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  // Return empty array during static generation
  if (typeof window === 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
    return [];
  }
  
  try {
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
  } catch (err) {
    console.error(`Exception fetching ${category} products:`, err);
    return [];
  }
}

// Submit contact form
export async function submitContactForm(submission: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert([submission]);
    
    if (error) {
      console.error('Error submitting contact form:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Exception submitting contact form:', err);
    return false;
  }
}

// Add a new product (admin functionality)
export async function addProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding product:', error);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error('Exception adding product:', err);
    return null;
  }
}

// Update a product (admin functionality)
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating product:', error);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error('Exception updating product:', err);
    return null;
  }
}

// Delete a product (admin functionality)
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting product:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Exception deleting product:', err);
    return false;
  }
}

// Fetch all contact submissions (admin functionality)
export async function fetchContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching contact submissions:', error);
      return [];
    }
    
    return data || [];
  } catch (err) {
    console.error('Exception fetching contact submissions:', err);
    return [];
  }
}
