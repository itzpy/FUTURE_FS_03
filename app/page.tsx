export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Abibas - Performance Sportswear
        </h1>
        <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
          Welcome to Abibas, where performance meets style. Our modern sportswear 
          is designed for athletes who demand excellence.
        </p>
        <div className="mt-12 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Shop Now
          </button>
        </div>
      </div>
    </main>
  )
}
