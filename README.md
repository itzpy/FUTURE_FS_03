# Abibas - AI-Powered Sportswear Rebrand

## 🎨 Project Overview

This is a modern rebrand of Adidas using AI-generated branding assets and cutting-edge web technologies. The project demonstrates the fusion of traditional sportswear design with innovative AI technology, creating a next-generation digital experience for a fictitious sports brand.

## ✨ Features

- **AI-Generated Branding & Products**: Modern visuals, product images via Stable Diffusion
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Animations**: Smooth transitions using Framer Motion
- **Modern UI/UX**: Clean, premium design for sports and lifestyle branding
- **Supabase Integration**: Backend services for data and image management
- **Admin Dashboard**: Complete product and message management
- **SEO Optimized**: Structured data, meta tags, sitemaps & robots.txt
- **Performance Focused**: Optimized for Core Web Vitals

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons

### Backend & Services
- **Supabase** - Database, storage, and API
- **Replicate** - AI image generation via Stable Diffusion
- **Next SEO** - SEO optimization with structured data
- **React Hook Form** - Form management
- **React Hot Toast** - Notifications

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for backend services)
- Replicate API key (for AI image generation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FUTURE_FS_03
   ```

2. **Run the setup script**

   For Windows (PowerShell):
   ```powershell
   ./setup.ps1
   ```

   For manual setup:
   ```bash
   # Install dependencies
   npm install

   # Create .env.local based on .env.example
   # Initialize Supabase
   npm run init:supabase

   # Generate AI images (requires Replicate API key)
   npm run generate:images
   
   # Start development server
   npm run dev
   ```

3. **Access the site and admin panel**
   - Main website: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin
   - Products management: http://localhost:3000/admin/products
   - Messages: http://localhost:3000/admin/messages

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
FUTURE_FS_03/
├── app/
│   ├── components/         # Reusable React components
│   │   ├── Navbar.tsx     # Navigation component
│   │   ├── Hero.tsx       # Hero section
│   │   ├── Features.tsx   # Features showcase
│   │   ├── Menu.tsx       # Product menu
│   │   ├── About.tsx      # About section
│   │   ├── Contact.tsx    # Contact form
│   │   └── Footer.tsx     # Footer component
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── seo.config.ts     # SEO configuration
├── lib/
│   └── firebase.ts       # Firebase configuration
├── public/               # Static assets
├── tailwind.config.js    # Tailwind configuration
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🎨 AI-Generated Branding Elements

### Color Palette
- **Primary Green**: Modern, sustainable feel (#22c55e)
- **Secondary Orange**: Energy and warmth (#f17220)
- **Neutral Grays**: Professional balance

### Typography
- **Headings**: Poppins (Modern, clean)
- **Body**: Inter (Readable, web-optimized)

### Design Philosophy
- **Minimalist**: Clean lines and plenty of white space
- **Modern**: Contemporary design elements
- **Accessible**: High contrast and readable fonts
- **Mobile-First**: Optimized for all devices

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables

### Manual Deployment
```bash
npm run build
npm run start
```

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly interactive elements
- Optimized images and assets
- Fast loading times
- Progressive Web App capabilities

## 🔧 Customization

### Updating Colors
Edit `tailwind.config.js` to modify the color palette:
```javascript
colors: {
  primary: {
    // Your custom primary colors
  },
  secondary: {
    // Your custom secondary colors
  }
}
```

### Adding New Components
1. Create component in `app/components/`
2. Follow existing naming conventions
3. Use TypeScript for type safety
4. Implement responsive design

### Firebase Setup
1. Create a new Firebase project
2. Enable Firestore, Authentication, and Storage
3. Add your config to `.env.local`
4. Customize data structure in Firebase console

## 🎯 Performance Features

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic bundle splitting
- **Lazy Loading**: Components load when needed
- **SEO Ready**: Meta tags and structured data
- **Core Web Vitals**: Optimized for Google's performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Future Interns** - For the project inspiration
- **AI Tools Used**:
  - Durable - Website layout generation
  - Adobe Firefly - Logo and visual elements
  - ChatGPT - Content creation and optimization
- **Design Inspiration**: Modern coffee shop aesthetics
- **Open Source Libraries**: All the amazing tools that made this possible

## 📞 Support

If you need help with the project:
- Create an issue on GitHub
- Check the documentation
- Reach out to the development team

---

**Made with ☕ and 🤖 by the Future Interns Team**
