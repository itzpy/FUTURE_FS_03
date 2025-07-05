# Abibas Deployment Checklist

Use this checklist to ensure your project is ready for deployment. Running through these steps will help eliminate common deployment issues.

## 🧹 Cleanup

- [ ] Run `./cleanup.ps1` to remove unnecessary files
- [ ] Remove Firebase dependencies (already handled by cleanup script)
- [ ] Ensure no test or temporary files remain

## 🔑 Environment Variables

- [ ] Check that all required environment variables are defined in `.env.example`
- [ ] Make sure you have `.env.local` properly configured for local testing
- [ ] Prepare environment variables for your deployment platform:
  - For Vercel: Add in project settings
  - For Netlify: Add in site settings
  
Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `REPLICATE_API_TOKEN` (if using AI image generation)

## 📊 Supabase Setup

- [ ] Ensure Supabase project is properly configured
- [ ] Run `npm run init:supabase` to initialize database tables
- [ ] Test database connections before deployment
- [ ] Set up appropriate security policies

## 🖼️ Images and Assets

- [ ] Check that all image paths are correct
- [ ] Ensure images are optimized for web
- [ ] Run `npm run generate:images` if using AI-generated images
- [ ] Verify all public assets are in place

## 🔍 SEO Optimization

- [ ] Verify meta tags are correctly set
- [ ] Check that structured data is properly formatted
- [ ] Ensure sitemap.ts and robots.ts are configured
- [ ] Test social sharing images

## 📱 Responsive Testing

- [ ] Test on mobile devices (or using device emulation)
- [ ] Test on tablets
- [ ] Test on desktop
- [ ] Check different browsers (Chrome, Firefox, Safari, Edge)

## 🚀 Build and Deployment

- [ ] Run `npm run build` to verify build succeeds
- [ ] Check for any build warnings or errors
- [ ] Set up deployment platform:
  - Vercel: Connect GitHub repository
  - Netlify: Configure build settings
  - Self-hosted: Set up server
- [ ] Configure custom domain (if applicable)
- [ ] Set up SSL certificates

## 🧪 Post-Deployment Testing

- [ ] Verify site loads properly
- [ ] Test all interactive features
- [ ] Check admin dashboard functionality
- [ ] Test contact form submissions
- [ ] Verify analytics are tracking correctly (if applicable)

## 🌟 Final Optimization

- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Verify accessibility compliance
- [ ] Test load speed and optimize if needed

## ✅ Ready for Launch!

Once all items are checked, your site should be ready for production use.
