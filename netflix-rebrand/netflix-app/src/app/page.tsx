import Navbar from '@/components/Navbar';
import ContentRow from '@/components/ContentRow';

// Sample data - in a real app, this would come from an API
const sampleContent = {
  trending: [
    { id: '1', title: 'The Digital Frontier', type: 'movie' as const },
    { id: '2', title: 'Cyber Chronicles', type: 'tv' as const },
    { id: '3', title: 'Virtual Reality Wars', type: 'movie' as const },
    { id: '4', title: 'AI Revolution', type: 'documentary' as const },
    { id: '5', title: 'Neural Networks', type: 'tv' as const },
    { id: '6', title: 'Future Vision', type: 'movie' as const },
  ],
  newReleases: [
    { id: '7', title: 'Quantum Dreams', type: 'movie' as const },
    { id: '8', title: 'Tech Titans', type: 'tv' as const },
    { id: '9', title: 'Digital Awakening', type: 'movie' as const },
    { id: '10', title: 'Code Masters', type: 'documentary' as const },
    { id: '11', title: 'Silicon Valley Stories', type: 'tv' as const },
    { id: '12', title: 'Innovation Nation', type: 'movie' as const },
  ],
  originals: [
    { id: '13', title: 'StreamFlix Exclusive', type: 'tv' as const },
    { id: '14', title: 'The Creator\'s Journey', type: 'documentary' as const },
    { id: '15', title: 'Beyond Tomorrow', type: 'movie' as const },
    { id: '16', title: 'Tech Legends', type: 'tv' as const },
    { id: '17', title: 'Digital Dynasty', type: 'movie' as const },
    { id: '18', title: 'Future Minds', type: 'documentary' as const },
  ]
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-black/50 to-black pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 to-blue-600/30"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 to-blue-400 bg-clip-text text-transparent">
            Stream Unlimited Entertainment
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Discover endless movies, TV shows, and originals. Reimagined for the modern age.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
            Start Watching
          </button>
        </div>
      </section>

      {/* Content Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {['Movies', 'TV Shows', 'Documentaries', 'Kids Content', 'Originals'].map((category) => (
              <div key={category} className="bg-gray-900 hover:bg-gray-800 rounded-lg p-6 text-center transition-all duration-300 transform hover:scale-105">
                <h3 className="text-lg font-semibold">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Rows */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <ContentRow title="Trending Now" items={sampleContent.trending} />
          <ContentRow title="New Releases" items={sampleContent.newReleases} />
          <ContentRow title="StreamFlix Originals" items={sampleContent.originals} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-red-500 mb-4">StreamFlix</h3>
            <p className="text-gray-400">The future of entertainment streaming</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Content</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Movies</li>
                <li>TV Shows</li>
                <li>Originals</li>
                <li>Kids</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Account</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Cookies</li>
                <li>DMCA</li>
              </ul>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            © 2025 StreamFlix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
