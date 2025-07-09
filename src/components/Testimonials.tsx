'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Creative Director',
    company: 'Design Studio',
    avatar: '👩‍🎨',
    rating: 5,
    text: 'The AI-powered camera features in the new iPhone are incredible. It&apos;s like having a professional photographer in my pocket. The Portrait mode with Neural Engine is simply magical.',
    featured: true
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Software Engineer',
    company: 'Tech Startup',
    avatar: '👨‍💻',
    rating: 5,
    text: 'MacBook Pro M4 has completely transformed my development workflow. The performance is unmatched, and the battery life lets me code all day without worrying about charging.',
    featured: false
  },
  {
    id: 3,
    name: 'Emily Watson',
    role: 'Medical Researcher',
    company: 'Stanford Medicine',
    avatar: '👩‍⚕️',
    rating: 5,
    text: 'Apple Watch Ultra 3&apos;s health monitoring capabilities are revolutionary. The precision and real-time insights have enhanced both my research and personal wellness journey.',
    featured: true
  },
  {
    id: 4,
    name: 'James Park',
    role: 'Music Producer',
    company: 'Independent Artist',
    avatar: '🎵',
    rating: 5,
    text: 'AirPods Pro 3 with Adaptive Audio has changed how I experience music. The spatial audio and noise cancellation create the perfect studio environment anywhere.',
    featured: false
  },
  {
    id: 5,
    name: 'Dr. Amara Okafor',
    role: 'Architect',
    company: 'Green Building Design',
    avatar: '👩‍🔬',
    rating: 5,
    text: 'iPad Air&apos;s M2 chip and Apple Pencil precision make architectural drawings incredibly intuitive. It&apos;s replaced my traditional drafting tools entirely.',
    featured: false
  },
  {
    id: 6,
    name: 'Alex Thompson',
    role: 'Content Creator',
    company: 'YouTube Channel',
    avatar: '🎥',
    rating: 5,
    text: 'The ecosystem integration is seamless. Starting a project on iPhone, editing on Mac, and presenting on iPad - it all works together like magic.',
    featured: true
  }
]

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const featuredTestimonials = testimonials.filter(t => t.featured)

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-heading font-bold text-gray-900 mb-6">
            What Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              Users Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who have transformed their lives with our innovative products.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <blockquote className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
                  &ldquo;{featuredTestimonials[activeTestimonial]?.text}&rdquo;
                </blockquote>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center text-2xl mr-4">
                    {featuredTestimonials[activeTestimonial]?.avatar}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg text-gray-900">
                      {featuredTestimonials[activeTestimonial]?.name}
                    </h4>
                    <p className="text-gray-600">
                      {featuredTestimonials[activeTestimonial]?.role} at {featuredTestimonials[activeTestimonial]?.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonial Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {featuredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  activeTestimonial === index 
                    ? 'bg-primary-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* All Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-lg mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '98%', label: 'Customer Satisfaction', icon: '😊' },
              { number: '2M+', label: 'Happy Customers', icon: '👥' },
              { number: '4.9', label: 'Average Rating', icon: '⭐' },
              { number: '175', label: 'Countries Served', icon: '🌍' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
