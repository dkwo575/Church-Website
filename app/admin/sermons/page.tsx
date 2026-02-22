'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import AuthGuard from '@/components/AuthGuard';
import { Video, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminSermonsUpload() {
  const [title, setTitle] = useState('');
  const [preacher, setPreacher] = useState('');
  const [date, setDate] = useState('');
  const [scripture, setScripture] = useState('');
  const [summary, setSummary] = useState('');
  const [youtubeId, setYoutubeId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'sermons'), {
        title,
        preacher,
        date,
        scripture,
        summary,
        youtubeId,
        createdAt: serverTimestamp(),
      });

      alert('Sermon posted successfully!');
      
      // Clear form
      setTitle(''); setPreacher(''); setDate(''); setScripture(''); setSummary(''); setYoutubeId('');
    } catch (error) {
      console.error("Error posting sermon: ", error);
      alert('Failed to post sermon.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        
        <div className="flex items-center gap-3 mb-6 border-b pb-4">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Video className="w-6 h-6 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Post a Sermon</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sermon Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preacher</label>
              <input type="text" value={preacher} onChange={(e) => setPreacher(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" placeholder="e.g., Feb 22, 2026" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Scripture Passage</label>
              <input type="text" value={scripture} onChange={(e) => setScripture(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" placeholder="e.g., John 3:16" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">YouTube Video ID</label>
              <input type="text" value={youtubeId} onChange={(e) => setYoutubeId(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" placeholder="e.g., dQw4w9WgXcQ" required />
              <p className="text-xs text-gray-400 mt-1">Only the ID (the random letters after v= in the link)</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Summary / Description</label>
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none" required />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publish Sermon'}
          </button>
        </form>
      </div>
    </AuthGuard>
  );
}