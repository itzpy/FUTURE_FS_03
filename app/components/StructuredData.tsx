'use client';

import { Product } from '@/lib/schema';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';

interface StructuredDataProps {
  product?: Product;
}

// This component generates structured data for a product page
export function ProductStructuredData({ product }: StructuredDataProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!product || !mounted) return null;

  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: [product.image_url],
    description: product.description,
    sku: `ABIBAS-${product.id}`,
    mpn: `AB-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'Abibas'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: Math.floor(Math.random() * 100) + 10, // For demo purposes
      bestRating: '5',
      worstRating: '1'
    },
    offers: {
      '@type': 'Offer',
      url: `https://abibas-rebrand.vercel.app/products/${product.id}`,
      priceCurrency: 'USD',
      price: product.price,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Abibas'
      }
    }
  };

  return (
    <Script id={`structured-data-${product.id}`} type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(structuredData)}
    </Script>
  );
}

// This component generates structured data for organization information
export function OrganizationStructuredData() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    name: 'Abibas',
    url: 'https://abibas-rebrand.vercel.app',
    logo: 'https://abibas-rebrand.vercel.app/logo.png',
    sameAs: [
      'https://facebook.com/abibas',
      'https://twitter.com/abibas',
      'https://instagram.com/abibas',
      'https://linkedin.com/company/abibas'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Adi-Dassler-Straße 1',
      addressLocality: 'Herzogenaurach',
      postalCode: '91074',
      addressCountry: 'DE'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49-9132-84-0',
      contactType: 'customer service',
      email: 'info@abibas.com',
      availableLanguage: ['English', 'German', 'Spanish', 'French']
    }
  };

  return (
    <Script id="org-structured-data" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(structuredData)}
    </Script>
  );
}

// This component generates FAQ structured data
export function FAQStructuredData() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes Abibas shoes different?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Abibas shoes are engineered using cutting-edge AI technology that analyzes thousands of athlete data points to create the perfect fit, support, and performance for your specific needs.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do Abibas products come with a warranty?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all Abibas footwear comes with a 1-year warranty against manufacturing defects under normal use. Our performance apparel carries a 6-month warranty.'
        }
      },
      {
        '@type': 'Question',
        name: 'How can I find the right size?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Abibas provides detailed size guides for all products. You can find the size guide on each product page. For footwear, we recommend measuring your feet in the afternoon when they are at their largest.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is your return policy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Abibas offers a 30-day return policy for unworn products in their original packaging. For online purchases, shipping for returns is free.'
        }
      }
    ]
  };

  return (
    <Script id="faq-structured-data" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(structuredData)}
    </Script>
  );
}

// This component generates breadcrumb structured data
export function BreadcrumbStructuredData({ product }: StructuredDataProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://abibas-rebrand.vercel.app'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://abibas-rebrand.vercel.app/products'
      }
    ]
  };

  if (product) {
    structuredData.itemListElement.push({
      '@type': 'ListItem',
      position: 3,
      name: product.name,
      item: `https://abibas-rebrand.vercel.app/products/${product.id}`
    });
  }

  return (
    <Script id="breadcrumb-structured-data" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(structuredData)}
    </Script>
  );
}

// Use this to combine all structured data on a page
export function SEOStructuredData({ product }: StructuredDataProps) {
  return (
    <>
      <OrganizationStructuredData />
      <FAQStructuredData />
      <BreadcrumbStructuredData product={product} />
      {product && <ProductStructuredData product={product} />}
    </>
  );
}
