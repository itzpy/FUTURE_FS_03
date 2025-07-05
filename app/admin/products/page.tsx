'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/schema';
import { fetchProducts } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import { uploadProductImage } from '@/lib/images';
import { Pencil, Trash, Save, X, Plus, Upload, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [isCreating, setIsCreating] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    rating: 5,
    image_url: '/images/products/placeholder.jpg',
    badges: [],
    category: 'footwear'
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Categories for dropdown
  const categories = ['footwear', 'apparel', 'accessories', 'equipment', 'originals'];

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const productData = await fetchProducts();
    setProducts(productData);
    setLoading(false);
  }

  function startEdit(product: Product) {
    setEditing(product.id);
    setEditForm({ ...product });
  }

  function cancelEdit() {
    setEditing(null);
    setEditForm({});
  }

  async function saveEdit() {
    if (!editing) return;

    try {
      toast.loading('Saving changes...');
      
      // Handle image upload if there's a file
      if (selectedFile) {
        const imageUrl = await uploadProductImage(selectedFile, editing);
        if (imageUrl) {
          editForm.image_url = imageUrl;
        }
      }
      
      const { error } = await supabase
        .from('products')
        .update(editForm)
        .eq('id', editing);
      
      if (error) throw error;
      
      toast.success('Product updated successfully!');
      cancelEdit();
      setSelectedFile(null);
      await loadProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  }

  async function deleteProduct(id: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      toast.loading('Deleting product...');
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Product deleted!');
      await loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  }

  async function createProduct() {
    try {
      toast.loading('Creating new product...');
      
      const { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select();
      
      if (error) throw error;
      
      // Handle image upload if there's a file
      if (selectedFile && data && data[0]) {
        const imageUrl = await uploadProductImage(selectedFile, data[0].id);
        if (imageUrl) {
          await supabase
            .from('products')
            .update({ image_url: imageUrl })
            .eq('id', data[0].id);
        }
      }
      
      toast.success('Product created successfully!');
      setIsCreating(false);
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        rating: 5,
        image_url: '/images/products/placeholder.jpg',
        badges: [],
        category: 'footwear'
      });
      setSelectedFile(null);
      await loadProducts();
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product');
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  }

  function handleBadgeChange(value: string, formType: 'edit' | 'new') {
    const badges = value.split(',').map(badge => badge.trim());
    
    if (formType === 'edit') {
      setEditForm(prev => ({
        ...prev,
        badges
      }));
    } else {
      setNewProduct(prev => ({
        ...prev,
        badges
      }));
    }
  }

  if (loading) {
    return (
      <div className="container-custom section-padding">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom section-padding">
      <h1 className="text-4xl font-heading font-bold mb-8">Product Admin</h1>
      
      <div className="mb-8 flex justify-between items-center">
        <button 
          onClick={() => setIsCreating(!isCreating)} 
          className="btn-primary flex items-center gap-2"
        >
          {isCreating ? (
            <>
              <X size={18} /> Cancel
            </>
          ) : (
            <>
              <Plus size={18} /> Add New Product
            </>
          )}
        </button>
        
        <button 
          onClick={loadProducts} 
          className="btn-outline flex items-center gap-2"
        >
          <RefreshCw size={18} /> Refresh
        </button>
      </div>
      
      {/* Create new product form */}
      {isCreating && (
        <div className="bg-neutral-50 p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-heading font-semibold mb-4">Create New Product</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select 
                className="w-full p-2 border rounded"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea 
              className="w-full p-2 border rounded"
              rows={3}
              value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                step="0.01"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Rating (0-5)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded"
                value={newProduct.rating}
                onChange={(e) => setNewProduct({...newProduct, rating: parseFloat(e.target.value)})}
                step="0.1"
                min="0"
                max="5"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Badges (comma-separated)</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded"
                value={newProduct.badges?.join(', ')}
                onChange={(e) => handleBadgeChange(e.target.value, 'new')}
                placeholder="New, Featured, Sale"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Product Image</label>
            <div className="flex items-center gap-4">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-neutral-700
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary-50 file:text-primary-700
                  hover:file:bg-primary-100"
              />
              {selectedFile && (
                <span className="text-sm text-green-600">
                  {selectedFile.name} selected
                </span>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <button 
              onClick={() => setIsCreating(false)} 
              className="btn-outline flex items-center gap-2"
            >
              <X size={18} /> Cancel
            </button>
            <button 
              onClick={createProduct} 
              className="btn-primary flex items-center gap-2"
            >
              <Save size={18} /> Create Product
            </button>
          </div>
        </div>
      )}
      
      {/* Products table */}
      <div className="bg-white rounded-xl overflow-hidden shadow">
        <table className="min-w-full">
          <thead className="bg-neutral-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-neutral-700">ID</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-neutral-700">Image</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-neutral-700">Name</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-neutral-700">Category</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-neutral-700">Price</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-neutral-700">Rating</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-neutral-50">
                {editing === product.id ? (
                  <>
                    <td className="py-3 px-4">{product.id}</td>
                    <td className="py-3 px-4">
                      <div className="relative h-16 w-16">
                        <img 
                          src={product.image_url} 
                          alt={product.name} 
                          className="h-full w-full object-cover rounded"
                        />
                        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded cursor-pointer">
                          <Upload size={16} className="text-white" />
                          <input 
                            type="file" 
                            className="opacity-0 absolute inset-0" 
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                        </label>
                      </div>
                      {selectedFile && (
                        <div className="text-xs text-green-600 mt-1">
                          New image selected
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <input 
                        type="text" 
                        className="w-full p-1 border rounded"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <select 
                        className="w-full p-1 border rounded"
                        value={editForm.category || ''}
                        onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <input 
                        type="number" 
                        className="w-full p-1 border rounded"
                        value={editForm.price || 0}
                        onChange={(e) => setEditForm({...editForm, price: parseFloat(e.target.value)})}
                        step="0.01"
                        min="0"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input 
                        type="number" 
                        className="w-full p-1 border rounded"
                        value={editForm.rating || 0}
                        onChange={(e) => setEditForm({...editForm, rating: parseFloat(e.target.value)})}
                        step="0.1"
                        min="0"
                        max="5"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={saveEdit}
                          className="p-1 bg-primary-100 text-primary-700 rounded hover:bg-primary-200"
                        >
                          <Save size={18} />
                        </button>
                        <button 
                          onClick={cancelEdit}
                          className="p-1 bg-neutral-100 text-neutral-700 rounded hover:bg-neutral-200"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-4">{product.id}</td>
                    <td className="py-3 px-4">
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="h-16 w-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-neutral-100">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {product.rating}
                        <span className="ml-1 text-yellow-500">★</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => startEdit(product)}
                          className="p-1 bg-primary-100 text-primary-700 rounded hover:bg-primary-200"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
