'use client';

import Navbar from '@/components/Navbar';
import { PlayCircle, User, Calendar } from 'lucide-react';

// Mock Data
const sermons = [
    {
        id: 1,
        title: "The Power of Forgiveness",
        preacher: "Rev. David Kim",
        date: "Feb 16, 2026",
        scripture: "Matthew 18:21-35",
        summary: "Forgiveness is not just a feeling; it is a choice that sets us free. In this sermon, we explore why Jesus commands us to forgive seventy-seven times.",
        youtubeId: "dQw4w9WgXcQ", // Replace with real YouTube Video ID (e.g., from the URL)
    },
    {
        id: 2,
        title: "Walking in Faith",
        preacher: "Rev. David Kim",
        date: "Feb 09, 2026",
        scripture: "Hebrews 11:1-6",
        summary: "What does it mean to have faith when we cannot see the outcome? We look at the heroes of faith and learn how to trust God in uncertainty.",
        youtubeId: "M7lc1UVf-VE", // Replace with real YouTube Video ID
    },
];

export default function SermonsPage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-20">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-12">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">Sunday Sermons</h1>
                    <p className="text-gray-600 mt-2">Watch and listen to the latest messages</p>
                </header>

                <div className="grid md:grid-cols-2 gap-8">
                    {sermons.map((sermon) => (
                        <div key={sermon.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition duration-300">

                            {/* YouTube Video Section */}
                            <div className="relative aspect-video bg-black">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${sermon.youtubeId}`}
                                    title={sermon.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="border-0"
                                ></iframe>
                            </div>

                            {/* Sermon Details */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h2 className="text-xl font-bold text-gray-900 leading-tight">
                                        {sermon.title}
                                    </h2>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <User className="w-4 h-4" />
                                        {sermon.preacher}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {sermon.date}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                                        {sermon.scripture}
                                    </span>
                                </div>

                                <p className="text-gray-600 text-sm line-clamp-3">
                                    {sermon.summary}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}