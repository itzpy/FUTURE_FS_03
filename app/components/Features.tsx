'use client'

import { motion } from 'framer-motion'
import { Zap, Leaf, Brain, Shield, TrendingUp, Users } from 'lucide-react'

const features = [
	{
		icon: Brain,
		title: 'AI-Powered Design',
		description:
			'Our advanced AI analyzes athlete performance data to create footwear and apparel optimized for your specific movements and needs.',
		color: 'from-purple-500 to-purple-600',
	},
	{
		icon: Leaf,
		title: 'Sustainable Innovation',
		description:
			'Every product is crafted with eco-friendly materials and production methods, supporting both performance and environmental responsibility.',
		color: 'from-green-500 to-green-600',
	},
	{
		icon: Zap,
		title: 'Performance Technology',
		description:
			'Cutting-edge materials and construction techniques deliver lightweight strength, superior flexibility, and maximum durability.',
		color: 'from-yellow-500 to-orange-500',
	},
	{
		icon: Shield,
		title: 'Quality Guaranteed',
		description:
			'Premium materials, expert craftsmanship, and rigorous testing ensure every product meets our exceptional standards.',
		color: 'from-blue-500 to-blue-600',
	},
	{
		icon: TrendingUp,
		title: 'Athletic Excellence',
		description:
			'Our product designers combine athletic expertise with modern innovation to create gear that elevates your performance.',
		color: 'from-amber-500 to-amber-600',
	},
	{
		icon: Users,
		title: 'Community Focused',
		description:
			'More than sportswear - we build communities where athletes connect, inspire, and push each other to new heights.',
		color: 'from-pink-500 to-pink-600',
	},
]

export function Features() {
	return (
		<section id="features" className="section-padding bg-neutral-50">
			<div className="container-custom">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4">
						Why Choose{' '}
						<span className="text-gradient">Abibas</span>?
					</h2>
					<p className="text-xl text-neutral-600 max-w-3xl mx-auto">
						We&apos;re revolutionizing the athletic experience through technology,
						sustainability,
						<br className="hidden sm:block" />
						and an unwavering commitment to performance that goes beyond the
						ordinary.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							whileHover={{ y: -5 }}
							className="card group cursor-pointer"
						>
							<div className="mb-6">
								<div
									className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
								>
									<feature.icon className="h-6 w-6 text-white" />
								</div>
							</div>

							<h3 className="text-xl font-heading font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
								{feature.title}
							</h3>

							<p className="text-neutral-600 leading-relaxed">
								{feature.description}
							</p>

							<div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<div
									className={`h-1 w-full bg-gradient-to-r ${feature.color} rounded-full`}
								/>
							</div>
						</motion.div>
					))}
				</div>

				{/* CTA Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="text-center mt-16"
				>
					<div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white">
						<h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">
							Ready to Experience the Future of Athletics?
						</h3>
						<p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
							Join millions of athletes who have already discovered the Abibas
							difference.
							<br className="hidden sm:block" />
							Your perfect gear is waiting.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button className="bg-white text-primary-600 hover:bg-primary-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
								Download App
							</button>
							<button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-all duration-200">
								Find Store
							</button>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
