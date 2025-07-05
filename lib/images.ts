import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export type ProductImage = {
  id: number;
  name: string;
  url: string;
  product_id: number;
};

export function useProductImages() {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('product_images')
          .select('*')
          .order('id', { ascending: true });
        
        if (error) throw error;
        
        setImages(data || []);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Unknown error fetching product images'));
        console.error('Error fetching product images:', e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, []);

  return { images, isLoading, error };
}

export async function uploadProductImage(file: File, productId: number): Promise<string | null> {
  try {
    // Generate a unique file name to prevent collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `product-${productId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;
    
    // Upload the file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);
    
    if (uploadError) throw uploadError;
    
    // Get the public URL
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);
    
    if (!data || !data.publicUrl) return null;
    
    // Save the image reference in the database
    const { error: dbError } = await supabase
      .from('product_images')
      .insert([
        { name: fileName, url: data.publicUrl, product_id: productId }
      ]);
    
    if (dbError) throw dbError;
    
    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading product image:', error);
    return null;
  }
}
