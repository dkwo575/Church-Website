// 'use client';

// import { useState } from 'react';
// import { db } from '@/lib/firebase';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import AuthGuard from '@/components/AuthGuard';
// import { Megaphone, Loader2 } from 'lucide-react';

// export default function AdminAnnouncementsUpload() {
//     const [title, setTitle] = useState('');
//     const [date, setDate] = useState('');
//     const [category, setCategory] = useState('Event');
//     const [content, setContent] = useState('');
//     const [isPinned, setIsPinned] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             // Save the text data into the 'announcements' collection in Firestore
//             await addDoc(collection(db, 'announcements'), {
//                 title,
//                 date,
//                 category,
//                 content,
//                 isPinned,
//                 createdAt: serverTimestamp(), // Keeps them in the correct order
//             });

//             alert('Announcement posted successfully!');

//             // Clear the form for the next entry
//             setTitle('');
//             setDate('');
//             setCategory('Event');
//             setContent('');
//             setIsPinned(false);

//         } catch (error) {
//             console.error("Error posting announcement: ", error);
//             alert('Failed to post announcement. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <AuthGuard>
//             <div className="max-w-2xl mx-auto mt-16 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
//                 <div className="flex items-center gap-3 mb-6 border-b pb-4">
//                     <div className="bg-orange-100 p-2 rounded-lg">
//                         <Megaphone className="w-6 h-6 text-orange-600" />
//                     </div>
//                     <h1 className="text-2xl font-bold text-gray-800">Post an Announcement</h1>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-6">

//                     <div className="grid md:grid-cols-2 gap-4">
//                         {/* Title */}
//                         <div className="md:col-span-2">
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">Announcement Title</label>
//                             <input
//                                 type="text"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition"
//                                 placeholder="e.g., Annual Church Picnic"
//                                 required
//                             />
//                         </div>

//                         {/* Date */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">Date (Optional)</label>
//                             <input
//                                 type="text"
//                                 value={date}
//                                 onChange={(e) => setDate(e.target.value)}
//                                 className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition"
//                                 placeholder="e.g., Feb 28, 2026"
//                             />
//                         </div>

//                         {/* Category */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//                             <select
//                                 value={category}
//                                 onChange={(e) => setCategory(e.target.value)}
//                                 className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition bg-white"
//                             >
//                                 <option value="Event">Event</option>
//                                 <option value="Finance">Finance</option>
//                                 <option value="Community">Community</option>
//                                 <option value="General">General News</option>
//                             </select>
//                         </div>
//                     </div>

//                     {/* Content */}
//                     <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">Announcement Details</label>
//                         <textarea
//                             value={content}
//                             onChange={(e) => setContent(e.target.value)}
//                             rows={5}
//                             className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition resize-none"
//                             placeholder="Write the full details of the announcement here..."
//                             required
//                         />
//                     </div>

//                     {/* Pin Checkbox */}
//                     <div className="flex items-center gap-2">
//                         <input
//                             type="checkbox"
//                             id="pin-checkbox"
//                             checked={isPinned}
//                             onChange={(e) => setIsPinned(e.target.checked)}
//                             className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500 cursor-pointer"
//                         />
//                         <label htmlFor="pin-checkbox" className="text-sm font-medium text-gray-700 cursor-pointer">
//                             Pin to the top of the list (Important)
//                         </label>
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
//                     >
//                         {loading ? (
//                             <>
//                                 <Loader2 className="w-5 h-5 animate-spin" /> Posting...
//                             </>
//                         ) : (
//                             'Post Announcement'
//                         )}
//                     </button>
//                 </form>
//             </div>
//         </AuthGuard>
//     );
// }



'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { db, auth } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Megaphone, Calendar, Pin, Trash2 } from 'lucide-react';

// Define what our announcement data looks like
interface Announcement {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  isPinned: boolean;
  createdAt: any;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Checks if you (the Admin) are currently logged in
  const [user] = useAuthState(auth); 

  useEffect(() => {
    // 1. Point to the 'announcements' drawer in Firestore
    const announcementsQuery = query(
      collection(db, 'announcements'),
      orderBy('createdAt', 'desc') // Fetch newest first
    );

    // 2. Listen for real-time updates
    const unsubscribe = onSnapshot(announcementsQuery, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Announcement[];

      // 3. Sort them so "Pinned" announcements always stay at the top
      const sortedAnnouncements = fetched.sort((a, b) => {
        if (a.isPinned === b.isPinned) return 0;
        return a.isPinned ? -1 : 1;
      });

      setAnnouncements(sortedAnnouncements);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Admin Delete Function
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      await deleteDoc(doc(db, 'announcements', id));
    }
  };

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

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500">No announcements at this time.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {announcements.map((item) => (
              <div 
                key={item.id} 
                className={`bg-white rounded-xl shadow-sm border p-6 transition relative group ${
                  item.isPinned ? 'border-orange-200 bg-orange-50/30' : 'border-gray-200 hover:shadow-md'
                }`}
              >
                {/* Admin Delete Button - Only visible if logged in */}
                {user && (
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors p-2"
                    title="Delete Announcement"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}

                <div className="flex justify-between items-start mb-4 pr-10">
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.category === 'Event' ? 'bg-blue-100 text-blue-800' :
                      item.category === 'Finance' ? 'bg-green-100 text-green-800' :
                      item.category === 'Community' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.category}
                    </span>
                    {item.isPinned && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                        <Pin className="w-3 h-3" /> Pinned
                      </span>
                    )}
                  </div>
                  {item.date && (
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {item.date}
                    </span>
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h2>
                {/* 'whitespace-pre-wrap' allows paragraph breaks (Enters) to show properly */}
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{item.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}