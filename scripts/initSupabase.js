// This script is used to initialize the Supabase database with demo products
// Run it with Node.js: node scripts/initSupabase.js

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Create a Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Demo products data
const products = [
  {
    name: 'Ultra Boost AI',
    description: 'Our AI-engineered running shoe with responsive cushioning, adaptive support, and breathable Primeknit upper. Perfect for long-distance running.',
    price: 189.95,
    rating: 4.9,
    image_url: '/images/products/ultraboost-ai.jpg', // Will replace with AI-generated images
    badges: ['AI Engineered', 'Bestseller'],
    category: 'footwear'
  },
  {
    name: 'Cloudfoam Striker',
    description: 'Lightweight and responsive with innovative Cloudfoam technology for maximum comfort and energy return. Ideal for everyday training.',
    price: 129.75,
    rating: 4.8,
    image_url: '/images/products/cloudfoam-striker.jpg',
    badges: ['New Tech', 'Sustainable'],
    category: 'footwear'
  },
  {
    name: 'Terrex Trail Pro',
    description: 'All-terrain trail running shoe with aggressive grip pattern, rock protection plate, and waterproof membrane. Ready for any adventure.',
    price: 149.65,
    rating: 4.7,
    image_url: '/images/products/terrex-trail-pro.jpg',
    badges: ['Trail Ready', 'Waterproof'],
    category: 'footwear'
  },
  {
    name: 'Predator Elite',
    description: 'Professional soccer cleats featuring precision control elements, lightweight chassis, and customizable stud configuration for elite players.',
    price: 224.85,
    rating: 4.9,
    image_url: '/images/products/predator-elite.jpg',
    badges: ['Pro Model', 'Premium'],
    category: 'footwear'
  },
  {
    name: 'TechFit Training Tee',
    description: 'Advanced compression technology with moisture-wicking fabric and targeted support zones for maximum athletic performance.',
    price: 59.95,
    rating: 4.8,
    image_url: '/images/products/techfit-tee.jpg',
    badges: ['Compression', 'Performance'],
    category: 'apparel'
  },
  {
    name: 'AeroReady Track Jacket',
    description: 'Lightweight running jacket with advanced ventilation, reflective details, and packable design for all-season training.',
    price: 89.25,
    rating: 4.9,
    image_url: '/images/products/aeroready-jacket.jpg',
    badges: ['Weather-Ready', 'Reflective'],
    category: 'apparel'
  },
  {
    name: 'Pro Performance Shorts',
    description: 'Designed for maximum mobility with four-way stretch fabric and moisture management technology. Perfect for intense workouts.',
    price: 45.00,
    rating: 4.7,
    image_url: '/images/products/performance-shorts.jpg',
    badges: ['Breathable', 'Stretch'],
    category: 'apparel'
  },
  {
    name: 'Elite Training Ball',
    description: 'FIFA quality-certified training ball with precision-engineered panels and responsive touch for superior ball control and consistency.',
    price: 29.99,
    rating: 4.8,
    image_url: '/images/products/training-ball.jpg',
    badges: ['FIFA Certified', 'Durable'],
    category: 'equipment'
  },
  {
    name: 'Performance Backpack',
    description: 'Water-resistant, ergonomic design with dedicated compartments for shoes, electronics, and hydration. Perfect for gym and daily use.',
    price: 65.00,
    rating: 4.9,
    image_url: '/images/products/backpack.jpg',
    badges: ['Water-Resistant', 'Ergonomic'],
    category: 'accessories'
  },
  {
    name: 'Heritage Originals Sneakers',
    description: 'Classic retro design with modern comfort technology. These iconic sneakers blend timeless style with contemporary performance.',
    price: 110.00,
    rating: 4.9,
    image_url: '/images/products/heritage-sneakers.jpg',
    badges: ['Iconic', 'Retro'],
    category: 'originals'
  }
];

async function initializeDatabase() {
  console.log('Starting database initialization...');
  
  // Check if we have the products table
  const { error: tableError } = await supabase
    .from('products')
    .select('count')
    .limit(1);
  
  // Create products table if it doesn't exist
  if (tableError) {
    console.log('Creating products table...');
    const { error } = await supabase.rpc('create_products_table');
    if (error) {
      console.error('Error creating products table:', error);
      return;
    }
  }
  
  // Insert products
  const { data, error } = await supabase
    .from('products')
    .upsert(products, { onConflict: 'name' });
  
  if (error) {
    console.error('Error inserting products:', error);
  } else {
    console.log('Products inserted successfully!');
  }
  
  // Check if we have the contact_submissions table
  const { error: contactTableError } = await supabase
    .from('contact_submissions')
    .select('count')
    .limit(1);
  
  // Create contact_submissions table if it doesn't exist
  if (contactTableError) {
    console.log('Creating contact_submissions table...');
    const { error } = await supabase.rpc('create_contact_submissions_table');
    if (error) {
      console.error('Error creating contact_submissions table:', error);
      return;
    }
    console.log('Contact submissions table created successfully!');
  }
}

initializeDatabase()
  .then(() => console.log('Database initialization complete.'))
  .catch((err) => console.error('Database initialization failed:', err));
