'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Star, Filter, Search, Loader } from 'lucide-react';
import { fetchProducts, Product } from '@/lib/supabase';
import Image from 'next/image';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>('popular');

  // Fetch products
  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const allProducts = await fetchProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(allProducts.map(product => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => 
          new Date(b.created_at || '').getTime() - 
          new Date(a.created_at || '').getTime()
        );
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery, sortOption]);

  return (
    <div className="min-h-screen bg-neutral-50 pt-24">
      <div className="container-custom py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Our <span className="text-gradient">Products</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-neutral-600 text-center max-w-3xl mx-auto mb-12"
        >
          Discover our AI-powered athletic footwear and apparel designed for maximum performance, 
          sustainability, and style.
        </motion.p>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
            
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Loader className="h-10 w-10 text-primary-500 animate-spin" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 bg-neutral-100">
                  {product.image_url && product.image_url.startsWith('http') ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-white text-5xl font-bold">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {product.badges && product.badges.length > 0 && (
                    <div className="absolute top-4 right-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.badges[0]}
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-neutral-900">{product.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 mb-4 line-clamp-2">{product.description}</p>
                  
                  {product.badges && product.badges.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.badges.slice(1).map((badge, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-xl text-neutral-600">
              No products found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSortOption('popular');
              }}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
