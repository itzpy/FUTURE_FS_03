export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-red-500">StreamFlix</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="text-white hover:text-red-400 transition-colors">Home</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Movies</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">TV Shows</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Originals</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">My List</a>
            </div>
          </div>

          {/* Search and Profile */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5zm-5-8V4l5 5-5 5V9z" />
              </svg>
            </button>
            <div className="h-8 w-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-sm font-semibold">U</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
