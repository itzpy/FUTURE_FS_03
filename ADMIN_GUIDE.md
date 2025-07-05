# AI-Powered Admin Panel and Image Generator Guide

This document outlines the process for setting up the AI-powered admin panel and image generator for the Abibas website. These features enhance the website with dynamic product management, AI-generated product images, and advanced SEO.

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
# Install all dependencies including Replicate for AI image generation
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Replicate API for AI image generation
REPLICATE_API_TOKEN=your_replicate_api_token

# Optional: Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
```

You'll need to get a Replicate API key from [replicate.com](https://replicate.com) to use the AI image generation features.

### 3. Initialize Supabase Database

Run the database initialization script to create tables and insert sample products:

```bash
npm run init:supabase
```

This will create:
- `products` table for product catalog
- `contact_submissions` table for form submissions
- `product_images` table for additional product images

### 4. Generate AI Product Images

Generate product images using Stable Diffusion via the Replicate API:

```bash
npm run generate:images
```

This script will:
1. Generate AI images for each product in the database
2. Save images to `/public/images/products/`
3. Update product records in Supabase with image URLs

> Note: This requires a valid Replicate API token in your `.env.local` file

## 🚀 Admin Dashboard

The admin dashboard is available at `/admin` and includes:

- **Dashboard Overview**: Key metrics and recent activity
- **Product Management**: Add, edit, and delete products
- **Customer Messages**: View and manage contact form submissions
- **Image Management**: Upload and generate AI images for products

### Admin Sections

1. **Dashboard** (`/admin`): Overview of site statistics
2. **Products** (`/admin/products`): Product catalog management 
3. **Messages** (`/admin/messages`): Contact form submissions

## 💎 SEO Features

The project includes enhanced SEO with structured data:

- **ProductStructuredData**: JSON-LD for product pages
- **OrganizationStructuredData**: Business information
- **FAQStructuredData**: Frequently asked questions
- **BreadcrumbStructuredData**: Navigation breadcrumbs

To use these components, import them into your page:

```jsx
import { SEOStructuredData } from '@/app/components/StructuredData';

// In your page component:
return (
  <>
    <SEOStructuredData product={productData} />
    {/* Rest of your page */}
  </>
);
```

## 🧪 Managing Products

Use the admin dashboard at `/admin/products` to manage products, or use the CLI tool:

```bash
# List all products
npm run manage:products list

# Get a specific product
npm run manage:products get 1

# Create a new product
npm run manage:products create

# Update a product
npm run manage:products update 1

# Delete a product
npm run manage:products delete 1

# Update product image
npm run manage:products update-image 1 /images/products/new-image.jpg
```

## 🚀 Deployment 

Follow the main [DEPLOYMENT.md](./DEPLOYMENT.md) guide for deploying the application, with these additional steps:

1. **Set environment variables** on your hosting platform, including the Replicate API token
2. **Run database initialization** on first deploy (can be done via CI/CD pipeline)
3. **Generate images** either before deployment or as part of your CI/CD process

## 🔒 Security Considerations

- The admin panel does not currently have authentication - add authentication before deploying to production
- Protect the `/admin` routes with middleware in a production environment
- Use environment variables for all sensitive API keys
- Set up proper CORS policies in Supabase
