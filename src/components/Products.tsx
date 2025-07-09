'use client'

import { motion } from 'framer-motion'

const products = [
  {
    id: 'iphone',
    name: 'iPhone 16 Pro',
    tagline: 'Titanium. So strong. So light.',
    price: 'From $999',
    image: '📱',
    color: 'from-blue-500 to-purple-600',
  },
  {
    id: 'ipad',
    name: 'iPad Pro',
    tagline: 'Your next computer is not a computer.',
    price: 'From $799',
    image: '💻',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'macbook',
    name: 'MacBook Air',
    tagline: 'Supercharged by M3.',
    price: 'From $1,099',
    image: '💻',
    color: 'from-gray-500 to-blue-600',
  },
  {
    id: 'watch',
    name: 'Apple Watch',
    tagline: 'A healthy leap ahead.',
    price: 'From $249',
    image: '⌚',
    color: 'from-red-500 to-orange-600',
  },
]

export default function Products() {
  return (
    <section className="section-padding bg-white" id="store">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
            Our Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Discover our complete lineup of innovative products designed to transform how you work, create, and connect.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="card overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                <div className={`h-64 bg-gradient-to-br ${product.color} p-8 flex items-center justify-center relative overflow-hidden`}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotateY: 15 }}
                    transition={{ duration: 0.3 }}
                    className="text-6xl filter drop-shadow-lg"
                  >
                    {product.image}
                  </motion.div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-balance">
                    {product.tagline}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary-600">
                      {product.price}
                    </span>
                    <button className="btn-primary py-2 px-4 text-sm">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
