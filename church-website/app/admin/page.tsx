'use client'; // This must be a Client Component to handle form inputs

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import AuthGuard from '@/components/AuthGuard';

export default function AdminPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Create a document in the "notices" collection
            await addDoc(collection(db, "notices"), {
                title: title,
                content: content,
                createdAt: serverTimestamp(), // Automatically set the date
            });

            alert('Notice added successfully!');
            setTitle('');
            setContent('');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Error uploading notice.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthGuard>

            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Admin: Add Notice</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Weekly Service Update"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md text-gray-900 h-32"
                            placeholder="Write the details here..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? 'Uploading...' : 'Post Notice'}
                    </button>
                </form>
            </div>
        </AuthGuard>

    );
}