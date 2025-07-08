interface ContentCardProps {
  title: string;
  image?: string;
  type?: 'movie' | 'tv' | 'documentary';
}

export default function ContentCard({ title, image, type = 'movie' }: ContentCardProps) {
  return (
    <div className="group cursor-pointer transition-all duration-300 transform hover:scale-105">
      <div className="relative aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:opacity-80"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
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
          {type === 'movie' ? '🎬' : type === 'tv' ? '📺' : '🎞️'}
        </div>
      </div>
      
      <div className="mt-2">
        <h3 className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">
          {title}
        </h3>
      </div>
    </div>
  );
}
