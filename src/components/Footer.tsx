'use client'

import { motion } from 'framer-motion'

const footerSections = [
  {
    title: 'Products',
    links: [
      { name: 'iPhone 16 Pro', href: '#iphone' },
      { name: 'MacBook Pro M4', href: '#mac' },
      { name: 'iPad Air', href: '#ipad' },
      { name: 'Apple Watch Ultra', href: '#watch' },
      { name: 'AirPods Pro', href: '#airpods' },
      { name: 'Apple Vision Pro', href: '#vision' },
    ]
  },
  {
    title: 'Services',
    links: [
      { name: 'Apple Store', href: '#store' },
      { name: 'AppleCare+', href: '#care' },
      { name: 'Apple Pay', href: '#pay' },
      { name: 'iCloud+', href: '#icloud' },
      { name: 'Apple Music', href: '#music' },
      { name: 'Apple TV+', href: '#tv' },
    ]
  },
  {
    title: 'Support',
    links: [
      { name: 'Contact Support', href: '#support' },
      { name: 'User Guides', href: '#guides' },
      { name: 'Tech Specs', href: '#specs' },
      { name: 'Service & Repair', href: '#repair' },
      { name: 'Warranty', href: '#warranty' },
      { name: 'System Status', href: '#status' },
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Apple', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Environment', href: '#environment' },
      { name: 'Privacy', href: '#privacy' },
      { name: 'Accessibility', href: '#accessibility' },
      { name: 'Newsroom', href: '#news' },
    ]
  }
]

const socialLinks = [
  { name: 'YouTube', icon: '📺', href: '#youtube' },
  { name: 'Twitter', icon: '🐦', href: '#twitter' },
  { name: 'Instagram', icon: '📷', href: '#instagram' },
  { name: 'LinkedIn', icon: '💼', href: '#linkedin' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container-custom py-16">
          <div className="grid lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-brand rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🍎</span>
                </div>
                <span className="font-heading font-bold text-2xl">Apple</span>
              </div>
              <p className="text-gray-400 mb-6 text-balance">
                Innovation that changes everything. Designed in California. 
                Think Different. Create Magic.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                    className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-200"
                    title={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <h4 className="font-heading font-semibold text-lg mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                    >
                      <a 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 block py-1"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-t border-gray-800 pt-8 mb-8"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-heading font-bold text-xl mb-2">
                  Get the latest updates
                </h3>
                <p className="text-gray-400">
                  Subscribe to our newsletter for product announcements and exclusive offers.
                </p>
              </div>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary-500 focus:outline-none text-white placeholder-gray-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-t border-gray-800 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                <p>&copy; 2025 Apple Reimagined. All rights reserved.</p>
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </a>
                <a href="#accessibility" className="text-gray-400 hover:text-white transition-colors">
                  Accessibility
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
