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

export type ContactSubmission = {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
};

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
};

// Database schemas for Supabase
export const PRODUCT_TABLE_SCHEMA = `
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  rating DECIMAL(3, 1),
  image_url TEXT,
  badges TEXT[],
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

export const CONTACT_TABLE_SCHEMA = `
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

export const PRODUCT_IMAGES_TABLE_SCHEMA = `
CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

// Structured data for products (for SEO)
export function generateProductJsonLd(product: Product): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image_url,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: Math.floor(Math.random() * 100) + 50, // Random number for demo
    },
    brand: {
      '@type': 'Brand',
      name: 'Abibas',
    },
  };
}

// Organization structured data (for SEO)
export const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  name: 'Abibas',
  url: 'https://abibas-rebrand.vercel.app',
  logo: 'https://abibas-rebrand.vercel.app/logo.png',
  sameAs: [
    'https://facebook.com/abibas',
    'https://twitter.com/abibas',
    'https://instagram.com/abibas',
    'https://linkedin.com/company/abibas',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+49-9132-84-0',
    contactType: 'customer service',
    email: 'info@abibas.com',
  },
};
