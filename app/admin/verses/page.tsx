'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import AuthGuard from '@/components/AuthGuard';
import { BookOpen, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminVersesUpload() {
  const [title, setTitle] = useState('');
  const [scripture, setScripture] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'verses'), {
        title,
        scripture,
        message,
        createdAt: serverTimestamp(),
      });

      alert('Weekly Word posted successfully!');
      setTitle(''); setScripture(''); setMessage('');
    } catch (error) {
      console.error("Error posting Weekly Word: ", error);
      alert('Failed to post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        
        <div className="flex items-center gap-3 mb-6 border-b pb-4">
          <div className="bg-green-100 p-2 rounded-lg">
            <BookOpen className="w-6 h-6 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Post Weekly Word</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Devotional Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="e.g., God's Faithfulness" required />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Scripture Reference</label>
            <input type="text" value={scripture} onChange={(e) => setScripture(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="e.g., Lamentations 3:22-23" required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message / Devotional</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={8} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none" placeholder="Write your message here..." required />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publish Weekly Word'}
          </button>
        </form>
      </div>
    </AuthGuard>
  );
}