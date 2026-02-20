import Navbar from '@/components/Navbar';

export default function GalleryPage() {
    // Placeholders - replace src with your real Firebase image URLs later
    const images = [1, 2, 3, 4, 5, 6];

    return (
        <main className="min-h-screen bg-white pt-20">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Church Gallery</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((item) => (
                        <div key={item} className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative group">
                            {/* Placeholder Image */}
                            <img
                                // src={`https://source.unsplash.com/random/800x800?church,people&sig=${item}`}
                                src="church-website/app/image/church3.jpg"
                                alt="Church Event"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                <p className="text-white font-medium">Sunday Service Event</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}