'use client';

import Navbar from '@/components/Navbar';
import { Megaphone, Calendar, Clock, Pin } from 'lucide-react';

// Mock Data (Replace with Firebase data later)
const announcements = [
    {
        id: 1,
        title: "수요일 사순절 예배",
        date: "Feb 19, 2026",
        category: "예배",
        content: "이번해 첫 사순절을 맞이하여 수요일 예배를 개최합니다.",
        isPinned: true, // Highlights this at the top
    },
    {
        id: 2,
        title: "Building Maintenance Fund",
        date: "Feb 15, 2026",
        category: "Finance",
        content: "We are raising funds to repair the roof of the education center. If you would like to contribute, please mark your offering as 'Building Fund'.",
        isPinned: false,
    },
    {
        id: 3,
        title: "New Bible Study Group",
        date: "Feb 10, 2026",
        category: "Community",
        content: "A new study group for young adults is starting next Tuesday at 7 PM. Contact Deacon John for more details.",
        isPinned: false,
    },
];

export default function AnnouncementsPage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-20">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <header className="mb-10 flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-full">
                        <Megaphone className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
                        <p className="text-gray-600">Stay updated with church news</p>
                    </div>
                </header>

                <div className="space-y-6">
                    {announcements.map((item) => (
                        <div
                            key={item.id}
                            className={`bg-white rounded-xl shadow-sm border p-6 transition hover:shadow-md ${item.isPinned ? 'border-orange-200 bg-orange-50/30' : 'border-gray-200'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-2 items-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.category === 'Event' ? 'bg-blue-100 text-blue-800' :
                                        item.category === 'Finance' ? 'bg-green-100 text-green-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                        {item.category}
                                    </span>
                                    {item.isPinned && (
                                        <span className="flex items-center gap-1 text-xs font-semibold text-orange-600">
                                            <Pin className="w-3 h-3" /> Pinned
                                        </span>
                                    )}
                                </div>
                                <span className="text-sm text-gray-400 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> {item.date}
                                </span>
                            </div>

                            <h2 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h2>
                            <p className="text-gray-600 leading-relaxed">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}