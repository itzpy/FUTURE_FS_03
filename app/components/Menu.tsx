'use client'

import React from 'react';
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Plus, Minus, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { fetchProductsByCategory, fetchProducts } from '@/lib/supabase'
import { Product } from '@/lib/models'

type CategoryItem = {
  id: string;
  name: string;
  active: boolean;
}

const productCategories: CategoryItem[] = [
  { id: 'footwear', name: 'Footwear', active: true },
  { id: 'apparel', name: 'Apparel', active: false },
  { id: 'equipment', name: 'Equipment', active: false },
  { id: 'originals', name: 'Originals', active: false },
  { id: 'accessories', name: 'Accessories', active: false },
]

// Demo products to show while loading or if Supabase fetch fails
const demoProducts = {
  footwear: [
    {
      id: '1',
      name: 'Ultra Boost AI',
      description: 'Our AI-engineered running shoe with responsive cushioning, adaptive support, and breathable Primeknit upper. Perfect for long-distance running.',
      price: 189.95,
      rating: 4.9,
      image_url: '/api/placeholder/300/300',
      badges: ['AI Engineered', 'Bestseller'],
      category: 'footwear'
    },
    {
      id: '2',
      name: 'Cloudfoam Striker',
      description: 'Lightweight and responsive with innovative Cloudfoam technology for maximum comfort and energy return. Ideal for everyday training.',
      price: 129.75,
      rating: 4.8,
      image_url: '/api/placeholder/300/300',
      badges: ['New Tech', 'Sustainable'],
      category: 'footwear'
    }
  ],
  apparel: [
    {
      id: '5',
      name: 'TechFit Training Tee',
      description: 'Advanced compression technology with moisture-wicking fabric and targeted support zones for maximum athletic performance.',
      price: 59.95,
      rating: 4.8,
      image_url: '/api/placeholder/300/300',
      badges: ['Compression', 'Performance'],
      category: 'apparel'
    }
  ]
}

export function Menu() {
  const [activeCategory, setActiveCategory] = useState('footwear')
  const [cart, setCart] = useState<{[key: string]: number}>({})
  const [products, setProducts] = useState<{[key: string]: Product[]}>({})
  const [isLoading, setIsLoading] = useState(true)

  // Fetch products from Supabase
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      try {
        const allProducts = await fetchProducts();
        
        // Group products by category
        const groupedProducts = allProducts.reduce((acc, product) => {
          const category = product.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {} as {[key: string]: Product[]});
        
        // If we got data, use it, otherwise fall back to demo products
        if (Object.keys(groupedProducts).length > 0) {
          setProducts(groupedProducts);
        } else {
          setProducts(demoProducts);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts(demoProducts);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }))
  }

  const removeFromCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }))
  }

  return (
    <section id="menu" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4">
            Our <span className="text-gradient">Premium Products</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Every product in our collection is engineered with precision, powered by AI technology, 
            and made from the finest sustainably sourced materials.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {productCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Product Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {isLoading ? (
            // Loading state
            <>
              {[1, 2, 3, 4].map((placeholder) => (
                <div key={placeholder} className="card animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-neutral-200 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-neutral-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-neutral-200 rounded w-5/6 mb-4"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-6 bg-neutral-200 rounded w-16"></div>
                        <div className="h-8 w-8 bg-neutral-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            (products[activeCategory] || []).map((item: Product, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group hover:shadow-2xl"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    {item.image_url && item.image_url.startsWith('http') ? (
                      <Image 
                        src={item.image_url} 
                        alt={item.name}
                        width={96}
                        height={96}
                        className="rounded-xl object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-primary rounded-xl flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {item.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    {item.badges && item.badges.length > 0 && (
                      <div className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badges[0]}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-heading font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors duration-300">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-neutral-700">{item.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-neutral-600 text-sm mb-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Badges */}
                    {item.badges && item.badges.length > 1 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.badges.slice(1).map((badge: string) => (
                          <span
                            key={badge}
                            className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price and Cart Controls */}
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-primary-600">
                        ${item.price.toFixed(2)}
                      </span>
                      
                      <div className="flex items-center space-x-2">
                        {item.id && cart[item.id] > 0 && (
                          <>
                            <button
                              onClick={() => item.id && removeFromCart(item.id)}
                              className="w-8 h-8 bg-neutral-200 hover:bg-neutral-300 rounded-full flex items-center justify-center transition-colors duration-200"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-medium min-w-[20px] text-center">
                              {item.id && cart[item.id]}
                            </span>
                          </>
                        )}
                        <button
                          onClick={() => item.id && addToCart(item.id)}
                          className="w-8 h-8 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* View Full Collection CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="btn-primary">
            View Full Collection & Shop Online
          </button>
          <p className="text-neutral-600 mt-4">
            Free shipping on orders over $100 with membership
          </p>
        </motion.div>
      </div>
    </section>
  )
}
