// Type definitions for our data models

export type Product = {
  id?: string;
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
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
};

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
};

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
