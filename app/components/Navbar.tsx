'use client'

import React from 'react';
import { useState } from 'react'
import { Menu, X, Star, User, ShoppingBag, Activity, Dumbbell } from 'lucide-react'
import { motion } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: 'Products', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Athletes', href: '#athletes' },
    { name: 'Originals', href: '#originals' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="bg-gradient-primary p-2 rounded-full">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-heading font-bold text-gradient">
              Abibas
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 transition-colors duration-200">
              <Star className="h-5 w-5" />
              <span className="font-medium">Rewards</span>
            </button>
            <button className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 transition-colors duration-200">
              <User className="h-5 w-5" />
              <span className="font-medium">Sign In</span>
            </button>
            <button className="btn-primary">
              Order Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-700 hover:text-primary-600 transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            className="md:hidden pb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-neutral-200">
                <button className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 transition-colors duration-200">
                  <Star className="h-5 w-5" />
                  <span className="font-medium">Rewards</span>
                </button>
                <button className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 transition-colors duration-200">
                  <User className="h-5 w-5" />
                  <span className="font-medium">Sign In</span>
                </button>
                <button className="btn-primary w-full">
                  Order Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
