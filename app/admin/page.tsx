// 'use client'; // This must be a Client Component to handle form inputs

// import { useState } from 'react';
// import { db } from '@/lib/firebase';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import AuthGuard from '@/components/AuthGuard';

// export default function AdminPage() {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             // Create a document in the "notices" collection
//             await addDoc(collection(db, "notices"), {
//                 title: title,
//                 content: content,
//                 createdAt: serverTimestamp(), // Automatically set the date
//             });

//             alert('Notice added successfully!');
//             setTitle('');
//             setContent('');
//         } catch (error) {
//             console.error("Error adding document: ", error);
//             alert('Error uploading notice.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <AuthGuard>

//             <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//                 <h1 className="text-2xl font-bold mb-4 text-gray-800">Admin: Add Notice</h1>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Title</label>
//                         <input
//                             type="text"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             className="mt-1 w-full p-2 border border-gray-300 rounded-md text-gray-900"
//                             placeholder="Weekly Service Update"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Content</label>
//                         <textarea
//                             value={content}
//                             onChange={(e) => setContent(e.target.value)}
//                             className="mt-1 w-full p-2 border border-gray-300 rounded-md text-gray-900 h-32"
//                             placeholder="Write the details here..."
//                             required
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
//                     >
//                         {loading ? 'Uploading...' : 'Post Notice'}
//                     </button>
//                 </form>
//             </div>
//         </AuthGuard>

//     );
// }

'use client';

import AuthGuard from '@/components/AuthGuard';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Image as ImageIcon, Megaphone, Video, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/'); // Send back to the public home page
  };

  return (
    <AuthGuard>
      <div className="max-w-5xl mx-auto mt-16 p-8">
        <div className="flex justify-between items-center mb-10 border-b pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-xl shadow-sm">
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-500">Manage your church website content</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 px-4 py-2 rounded-lg transition font-medium"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>

        {/* Dashboard Menu Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          
          <Link href="/admin/announcements" className="block group">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-orange-500 hover:shadow-md transition cursor-pointer h-full">
              <Megaphone className="w-10 h-10 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">Announcements</h2>
              <p className="text-gray-500 text-sm">Post weekly news, events, and pinned updates.</p>
            </div>
          </Link>

          <Link href="/admin/gallery" className="block group">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition cursor-pointer h-full">
              <ImageIcon className="w-10 h-10 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">Photo Gallery</h2>
              <p className="text-gray-500 text-sm">Upload images from church events and services.</p>
            </div>
          </Link>

          <Link href="/admin/sermons" className="block group">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-purple-500 hover:shadow-md transition cursor-pointer h-full">
              <Video className="w-10 h-10 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">Sunday Sermons</h2>
              <p className="text-gray-500 text-sm">Add YouTube links and sermon summaries.</p>
            </div>
          </Link>

        </div>
      </div>
    </AuthGuard>
  );
}