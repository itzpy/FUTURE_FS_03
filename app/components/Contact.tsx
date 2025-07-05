'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { submitContactForm } from '@/lib/supabase'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    toast.loading('Sending message...', { duration: 2000 })
    
    try {
      const success = await submitContactForm(formData)
      
      if (success) {
        toast.success('Message sent successfully! We\'ll get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        toast.error('Something went wrong. Please try again later.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('Something went wrong. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Headquarters',
      details: ['Adi-Dassler-Straße 1', '91074 Herzogenaurach', 'Germany'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+49 9132 84-0', 'Customer Service: 24/7', 'Business Hours: 8 AM - 8 PM'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@abibas.com', 'support@abibas.com', 'athletes@abibas.com'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 8 AM - 8 PM', 'Saturday: 9 AM - 6 PM', 'Sunday: 10 AM - 4 PM'],
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Have questions, feedback, or want to learn more about Abibas? 
            We&apos;d love to hear from you. Reach out to us anytime!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-heading font-semibold text-neutral-900 mb-8">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-6 bg-neutral-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center flex-shrink-0`}>
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                      {info.title}
                    </h4>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-neutral-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 bg-gradient-primary rounded-xl p-8 text-white text-center"
            >
              <MapPin className="h-16 w-16 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Find Us on the Map</h4>
              <p className="text-primary-100 mb-4">
                Interactive map coming soon with all our store locations worldwide
              </p>
              <button className="bg-white text-primary-600 hover:bg-primary-50 font-medium py-2 px-6 rounded-lg transition-colors duration-200">
                View Store Locator
              </button>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-neutral-50 rounded-2xl p-8">
              <h3 className="text-2xl font-heading font-semibold text-neutral-900 mb-6">
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Quick Contact Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              <button className="btn-outline text-center">
                Live Chat Support
              </button>
              <button className="btn-outline text-center">
                Schedule a Call
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
