'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, TrendingUp, Star } from 'lucide-react'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-primary-50/30 opacity-40" />
      
      <div className="container-custom relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Performance</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-neutral-900 mb-6 leading-tight"
            >
              Where Sport
              <span className="text-gradient block">
                Meets Innovation
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl text-neutral-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Experience the future of athletic performance with our AI-designed footwear, 
              sustainable materials, and personalized training recommendations 
              that adapt to your athletic preferences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="btn-primary group">
                Discover Our Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="btn-outline">
                Find Stores
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex items-center justify-center lg:justify-start space-x-8 mt-12"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">70M+</div>
                <div className="text-sm text-neutral-600">Athletes Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">5K+</div>
                <div className="text-sm text-neutral-600">Stores</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-3xl font-bold text-primary-600 ml-1">4.9</span>
                </div>
                <div className="text-sm text-neutral-600">Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-lg lg:max-w-full">
              {/* Main Image */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <div className="bg-gradient-primary p-8 rounded-3xl shadow-2xl">
                  <TrendingUp className="h-32 w-32 text-white mx-auto" />
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  x: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -top-4 -right-4 bg-secondary-500 text-white p-4 rounded-xl shadow-lg"
              >
                <Star className="h-6 w-6" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  x: [0, -5, 0]
                }}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-6 -left-6 bg-white p-3 rounded-xl shadow-lg border border-neutral-200"
              >
                <Sparkles className="h-5 w-5 text-primary-600" />
              </motion.div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-3xl blur-3xl -z-10 scale-110" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary-600 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-primary-600 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  )
}
