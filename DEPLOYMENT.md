# Abibas Deployment Guide

## 📋 Pre-Deployment Checklist

### 1. Environment Setup
- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] All dependencies installed
- [ ] Build process tested locally

### 2. Performance Optimization
- [ ] Images optimized and compressed
- [ ] Bundle size analyzed
- [ ] SEO meta tags configured
- [ ] Core Web Vitals tested

### 3. Security
- [ ] Environment variables secured
- [ ] Firebase security rules configured
- [ ] API keys restricted to domains
- [ ] HTTPS enabled

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides seamless Next.js deployment with automatic optimizations.

**Steps:**
1. **Connect Repository**
   ```bash
   # Push your code to GitHub first
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Connect your GitHub account
   - Import your repository
   - Configure environment variables
   - Deploy

3. **Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`
   - Make sure to include Supabase URL and anon key
   - Deploy again if needed

**Benefits:**
- Automatic deployments on git push
- Global CDN
- Serverless functions
- Analytics included
- Zero configuration

### Option 2: Netlify

**Steps:**
1. **Build Configuration**
   ```bash
   # Build command
   npm run build
   
   # Publish directory
   out
   ```

2. **Deploy to Netlify**
   - Connect GitHub repository
   - Set build settings
   - Add environment variables
   - Deploy

**Configuration for Netlify:**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: Traditional VPS/Server

**Requirements:**
- Node.js 18+
- PM2 for process management
- Nginx for reverse proxy
- SSL certificate

**Steps:**
1. **Server Setup**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   npm install -g pm2
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone <your-repo-url>
   cd FUTURE_FS_03
   
   # Install dependencies
   npm install
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start npm --name "stellarbucks" -- start
   pm2 save
   pm2 startup
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔧 Firebase Configuration

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project
3. Enable required services:
   - Authentication
   - Firestore Database
   - Storage
   - Analytics (optional)

### 2. Configure Authentication
```javascript
// Enable sign-in methods in Firebase Console
- Email/Password
- Google
- Anonymous (for guest users)
```

### 3. Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Menu items are read-only for all users
    match /menu/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Contact messages can be created by anyone
    match /contacts/{document=**} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

### 4. Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🔍 SEO Optimization

### 1. Meta Tags Checklist
- [ ] Title tags (unique, descriptive)
- [ ] Meta descriptions
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Canonical URLs
- [ ] Structured data

### 2. Performance Optimization
```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Test Core Web Vitals
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

### 3. Sitemap Generation
Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://stellarbucks.com</loc>
    <lastmod>2024-01-01</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://stellarbucks.com/menu</loc>
    <lastmod>2024-01-01</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

## 📊 Analytics Setup

### 1. Google Analytics 4
```javascript
// Add to next.config.js
const nextConfig = {
  env: {
    GOOGLE_ANALYTICS_ID: 'G-XXXXXXXXXX'
  }
}
```

### 2. Firebase Analytics
Already configured in `lib/firebase.ts`

### 3. Vercel Analytics
```bash
npm install @vercel/analytics
```

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit `.env` files
- Use different configs for different environments
- Restrict API keys to specific domains

### 2. Content Security Policy
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval';"
  }
]
```

### 3. Firebase Security
- Configure authentication rules
- Set up Firestore security rules
- Enable App Check for production

## 🚀 Performance Monitoring

### 1. Web Vitals
- Monitor Core Web Vitals
- Set up performance budgets
- Use Lighthouse CI

### 2. Error Tracking
```bash
# Add Sentry for error tracking
npm install @sentry/nextjs
```

### 3. Uptime Monitoring
- Set up monitoring with Uptime Robot
- Configure alerts
- Monitor API endpoints

## 🔄 Continuous Deployment

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📝 Post-Deployment

### 1. Testing
- [ ] Functionality testing
- [ ] Mobile responsiveness
- [ ] Performance testing
- [ ] SEO audit

### 2. Monitoring
- [ ] Set up analytics
- [ ] Configure error tracking
- [ ] Monitor performance metrics

### 3. Documentation
- [ ] Update README
- [ ] Document API endpoints
- [ ] Create user guides

---

## 🆘 Troubleshooting

### Common Issues

**Build Errors:**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

**Environment Variables Not Working:**
- Check variable names (must start with NEXT_PUBLIC_ for client-side)
- Restart development server after changes
- Verify in Vercel/Netlify dashboard

**Firebase Connection Issues:**
- Verify all environment variables
- Check Firebase project settings
- Ensure services are enabled

**Performance Issues:**
- Analyze bundle size
- Optimize images
- Enable compression
- Use CDN for static assets

### Support Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Support](https://vercel.com/support)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Ready to deploy? Choose your preferred platform and follow the guide above!** 🚀
