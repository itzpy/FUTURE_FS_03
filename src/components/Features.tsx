'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: '🧠',
    title: 'AI-Powered Intelligence',
    description: 'Revolutionary machine learning capabilities that adapt to your needs and enhance your daily workflow.',
  },
  {
    icon: '🔒',
    title: 'Privacy by Design',
    description: 'Advanced encryption and on-device processing ensure your data remains secure and private.',
  },
  {
    icon: '⚡',
    title: 'Lightning Performance',
    description: 'Optimized hardware and software integration delivering unprecedented speed and efficiency.',
  },
  {
    icon: '🌍',
    title: 'Seamless Ecosystem',
    description: 'All your devices work together effortlessly, creating a unified and intuitive experience.',
  },
]

export default function Features() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
            Innovation at its Core
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Discover the groundbreaking features that make our products extraordinary. 
            Every detail is crafted with precision and purpose.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="card p-8 text-center group hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-balance">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
