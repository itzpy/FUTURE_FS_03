'use client'

import { motion } from 'framer-motion'

const innovations = [
  {
    title: 'Neural Engine',
    description: 'Advanced machine learning processing for intelligent photography, voice recognition, and AR experiences.',
    icon: '🧠',
    stat: '15.8 TOPS',
    detail: 'of ML compute'
  },
  {
    title: 'Quantum Encryption',
    description: 'Next-generation security protocols protecting your data with quantum-resistant encryption.',
    icon: '🔐',
    stat: '256-bit',
    detail: 'quantum security'
  },
  {
    title: 'Bionic Efficiency',
    description: 'Revolutionary chip architecture delivering exceptional performance while maximizing battery life.',
    icon: '⚡',
    stat: '40%',
    detail: 'more efficient'
  }
]

export default function Innovation() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
            Innovation
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Never Stops
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We&apos;re constantly pushing the boundaries of what&apos;s possible with cutting-edge AI, 
            quantum security, and revolutionary engineering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {innovations.map((innovation, index) => (
            <motion.div
              key={innovation.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group-hover:scale-105">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {innovation.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold mb-3">
                  {innovation.title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {innovation.description}
                </p>
                <div className="border-t border-white/20 pt-4">
                  <div className="text-3xl font-bold text-blue-400">
                    {innovation.stat}
                  </div>
                  <div className="text-sm text-gray-400">
                    {innovation.detail}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg">
            Explore Technology
          </button>
        </motion.div>
      </div>
    </section>
  )
}
