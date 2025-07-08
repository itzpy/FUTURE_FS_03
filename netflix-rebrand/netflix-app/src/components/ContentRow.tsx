interface ContentRowProps {
  title: string;
  items: Array<{
    id: string;
    title: string;
    image?: string;
    type?: 'movie' | 'tv' | 'documentary';
  }>;
}

export default function ContentRow({ title, items }: ContentRowProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {items.map((item) => (
          <div key={item.id} className="flex-none w-48">
            <div className="group cursor-pointer transition-all duration-300 transform hover:scale-105">
              <div className="relative aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
                {item.image ? (
                  <div className="w-full h-full bg-gradient-to-br from-red-900/30 to-blue-900/30" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-800 to-gray-900">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-black rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>

                {/* Type indicator */}
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {item.type === 'movie' ? '🎬' : item.type === 'tv' ? '📺' : '🎞️'}
                </div>
              </div>
              
              <div className="mt-2">
                <h3 className="text-sm font-medium text-white group-hover:text-red-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
