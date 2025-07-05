'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react'

const footerLinks = {
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Our Products', href: '#menu' },
    { name: 'Stories & News', href: '#' },
    { name: 'Investor Relations', href: '#' },
    { name: 'Careers', href: '#' },
  ],
  customer: [
    { name: 'Contact Us', href: '#contact' },
    { name: 'Store Locator', href: '#' },
    { name: 'Gift Cards', href: '#' },
    { name: 'My Account', href: '#' },
    { name: 'Customer Service', href: '#' },
  ],
  social: [
    { name: 'Social Impact', href: '#' },
    { name: 'Environment', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'Diversity & Inclusion', href: '#' },
    { name: 'Accessibility', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Use', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Trademarks', href: '#' },
    { name: 'Supply Chain', href: '#' },
  ]
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-neutral-800">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-3xl font-heading font-bold mb-4">
              Stay Connected with <span className="text-gradient bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">Abibas</span>
            </h3>
            <p className="text-neutral-300 mb-8">
              Get the latest updates on new products, exclusive offers, and sustainable initiatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-white placeholder-neutral-400"
              />
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-primary p-2 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-heading font-bold">Abibas</span>
            </div>
            <p className="text-neutral-300 mb-6 leading-relaxed">
              Pioneering the future of athletic performance through AI-powered design, 
              sustainable materials, and uncompromising quality. Empowering every athlete.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-neutral-300">
                <MapPin className="h-5 w-5 text-primary-400" />
                <span>Adi-Dassler-Straße 1, 91074 Herzogenaurach, Germany</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-300">
                <Phone className="h-5 w-5 text-primary-400" />
                <span>+49 9132 84-0</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-300">
                <Mail className="h-5 w-5 text-primary-400" />
                <span>info@abibas.com</span>
              </div>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6">Customer Service</h4>
            <ul className="space-y-3">
              {footerLinks.customer.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Impact Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-6">Social Impact</h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-neutral-400 text-sm"
            >
              © 2025 Abibas AG. All rights reserved.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex space-x-4"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors duration-200 group"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5 text-neutral-400 group-hover:text-white transition-colors duration-200" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
