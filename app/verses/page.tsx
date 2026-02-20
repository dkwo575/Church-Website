'use client';

import Navbar from '@/components/Navbar';
import { BookOpen } from 'lucide-react';

// Sample Data (In real life, you fetch this from Firebase!)
const verses = [
    {
        id: 1,
        date: 'Feb 12, 2026',
        title: 'Strength in Waiting',
        passage: 'Isaiah 40:31',
        text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
    },
    {
        id: 2,
        date: 'Feb 05, 2026',
        title: 'The Peace of God',
        passage: 'Philippians 4:6-7',
        text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
    }
];

export default function VersesPage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-20">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-12">
                <header className="mb-10 text-center">
                    <span className="inline-block p-3 rounded-full bg-blue-100 mb-4">
                        <BookOpen className="w-8 h-8 text-blue-600" />
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900">Weekly Word</h1>
                    <p className="text-gray-600 mt-2">A verse to meditate on for the week</p>
                </header>

                {/* Notice Board List */}
                <div className="space-y-6">
                    {verses.map((verse) => (
                        <div key={verse.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                            {/* Header of the Card */}
                            <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
                                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                                    Week of {verse.date}
                                </span>
                                <span className="text-sm text-gray-500 font-medium">{verse.passage}</span>
                            </div>

                            {/* Content of the Card */}
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-3">{verse.title}</h2>
                                <p className="text-gray-600 italic leading-relaxed text-lg font-serif">
                                    "{verse.text}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}