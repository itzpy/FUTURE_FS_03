'use client'

import { motion } from 'framer-motion'
import { Users, Award, Globe, Heart, Dumbbell, Footprints, Medal, Timer } from 'lucide-react'

const stats = [
  { number: '1949', label: 'Founded', icon: Award },
  { number: '160+', label: 'Countries', icon: Globe },
  { number: '62K+', label: 'Employees', icon: Users },
  { number: '900M+', label: 'Products Sold Yearly', icon: Heart },
]

const values = [
  {
    icon: Heart,
    title: 'Through Sport, We Unite',
    description: 'We bring people together through the power of sport, fostering communities and celebrating diversity.'
  },
  {
    icon: Globe,
    title: 'Sustainable Innovation',
    description: 'We are committed to creating sustainable products that reduce environmental impact without sacrificing performance.'
  },
  {
    icon: Medal,
    title: 'Achieving Excellence',
    description: 'We push boundaries through continuous innovation and strive for excellence in everything we create.'
  },
  {
    icon: Timer,
    title: 'Performance First',
    description: 'We design every product with the athlete in mind, focusing on enhancing performance and comfort.'
  }
]

export function About() {
  return (
    <section id="about" className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50/30">
      <div className="container-custom">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-6">
              Our Story: From <span className="text-gradient">Shoe Workshop</span> to Global Sportswear Icon
            </h2>
            <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
              What began in a small German town with a passion for athletic footwear has evolved into 
              a global sportswear powerhouse that combines classic design principles with 
              cutting-edge performance technology and sustainable manufacturing.
            </p>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Today, Abibas represents more than just sportswear – we&apos;re a community 
              of athletes, designers, and innovators who believe in the power of sport 
              to change lives and bring people together across cultures and boundaries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary">
                Our Heritage
              </button>
              <button className="btn-outline">
                Sustainability Initiatives
              </button>
            </div>
          </motion.div>

          {/* Right Content - Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-primary rounded-2xl p-12 text-white">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <Dumbbell className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Performance</h3>
                  <p className="text-primary-100">Athlete-tested excellence</p>
                </div>
                <div className="text-center">
                  <Footprints className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Innovation</h3>
                  <p className="text-primary-100">Cutting-edge technology</p>
                </div>
                <div className="text-center">
                  <Users className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Community</h3>
                  <p className="text-primary-100">Uniting through sport</p>
                </div>
                <div className="text-center">
                  <Award className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Style</h3>
                  <p className="text-primary-100">Iconic design heritage</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <stat.icon className="h-8 w-8 text-primary-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-neutral-900 mb-2">{stat.number}</div>
                <div className="text-neutral-600 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
            Our <span className="text-gradient">Core Values</span>
          </h3>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            These values guide every product we design and every athlete we support, 
            ensuring that Abibas remains true to its mission of excellence in sport.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-xl p-3 group-hover:bg-primary-600 transition-colors duration-300">
                  <value.icon className="h-6 w-6 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-xl font-heading font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-neutral-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-500 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Our Mission
            </h3>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              &quot;To be the best sports brand in the world. We design, create, and develop the best sports products in the world, 
              with the best service and experience, in a sustainable way.&quot;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
