// This script provides utility functions for managing products in Supabase
// It allows for creating, updating, and deleting products

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Function to get all products
async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data;
}

// Function to get a product by ID
async function getProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
  
  return data;
}

// Function to create a new product
async function createProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select();
  
  if (error) {
    console.error('Error creating product:', error);
    return null;
  }
  
  return data[0];
}

// Function to update a product
async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error(`Error updating product ${id}:`, error);
    return null;
  }
  
  return data[0];
}

// Function to delete a product
async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error deleting product ${id}:`, error);
    return false;
  }
  
  return true;
}

// Helper function to update image URL for a product
async function updateProductImage(id, imageUrl) {
  return updateProduct(id, { image_url: imageUrl });
}

// Helper function to update product category
async function updateProductCategory(id, category) {
  return updateProduct(id, { category });
}

// Helper function to update product badges
async function updateProductBadges(id, badges) {
  return updateProduct(id, { badges });
}

// Command line interface for the script
async function main() {
  const command = process.argv[2];
  
  if (!command) {
    console.log('Available commands:');
    console.log('- list: List all products');
    console.log('- get <id>: Get product by ID');
    console.log('- create: Create a new product (provide details via prompt)');
    console.log('- update <id>: Update a product (provide details via prompt)');
    console.log('- delete <id>: Delete a product');
    console.log('- update-image <id> <imageUrl>: Update product image');
    return;
  }

  switch (command) {
    case 'list':
      const products = await getAllProducts();
      console.log('Products:', JSON.stringify(products, null, 2));
      break;
    
    case 'get':
      const id = process.argv[3];
      if (!id) {
        console.error('Please provide a product ID');
        return;
      }
      const product = await getProductById(id);
      console.log('Product:', JSON.stringify(product, null, 2));
      break;
    
    case 'create':
      // In a real CLI we'd use a library like inquirer to prompt for details
      // For this example, we'll use a hardcoded product
      const newProduct = {
        name: 'New Product Example',
        description: 'This is an example product created via CLI',
        price: 99.99,
        rating: 4.5,
        image_url: '/images/products/placeholder.jpg',
        badges: ['New', 'Example'],
        category: 'example'
      };
      
      const created = await createProduct(newProduct);
      console.log('Created product:', JSON.stringify(created, null, 2));
      break;
    
    case 'update':
      const updateId = process.argv[3];
      if (!updateId) {
        console.error('Please provide a product ID to update');
        return;
      }
      
      // Example update
      const updates = {
        description: 'Updated description via CLI',
        price: 89.99
      };
      
      const updated = await updateProduct(updateId, updates);
      console.log('Updated product:', JSON.stringify(updated, null, 2));
      break;
    
    case 'delete':
      const deleteId = process.argv[3];
      if (!deleteId) {
        console.error('Please provide a product ID to delete');
        return;
      }
      
      const deleted = await deleteProduct(deleteId);
      if (deleted) {
        console.log(`Product ${deleteId} deleted successfully`);
      } else {
        console.log(`Failed to delete product ${deleteId}`);
      }
      break;
    
    case 'update-image':
      const imgId = process.argv[3];
      const imageUrl = process.argv[4];
      
      if (!imgId || !imageUrl) {
        console.error('Please provide both a product ID and image URL');
        return;
      }
      
      const imgUpdated = await updateProductImage(imgId, imageUrl);
      console.log('Updated product image:', JSON.stringify(imgUpdated, null, 2));
      break;
    
    default:
      console.error(`Unknown command: ${command}`);
      break;
  }
}

// If this file is being run directly
if (require.main === module) {
  main()
    .then(() => console.log('Done'))
    .catch(error => console.error('Error:', error));
}

// Export functions for use in other scripts
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductImage,
  updateProductCategory,
  updateProductBadges
};
