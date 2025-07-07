// Image upload utilities for Supabase Storage

import { supabase } from './supabase';

/**
 * Upload a product image to Supabase Storage
 */
export async function uploadProductImage(file: File, productId?: string): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${productId || Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadProductImage:', error);
    return null;
  }
}

/**
 * Delete a product image from Supabase Storage
 */
export async function deleteProductImage(imageUrl: string): Promise<boolean> {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const filePath = `products/${fileName}`;

    const { error } = await supabase.storage
      .from('product-images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteProductImage:', error);
    return false;
  }
}

/**
 * Get a list of all product images
 */
export async function listProductImages(): Promise<string[]> {
  try {
    const { data, error } = await supabase.storage
      .from('product-images')
      .list('products');

    if (error) {
      console.error('Error listing images:', error);
      return [];
    }

    return data.map(file => {
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(`products/${file.name}`);
      
      return publicUrl;
    });
  } catch (error) {
    console.error('Error in listProductImages:', error);
    return [];
  }
}
