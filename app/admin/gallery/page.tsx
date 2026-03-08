'use client';

import { useState } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AuthGuard from '@/components/AuthGuard'; // Protects this page
import { ImagePlus, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminGalleryUpload() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // 1. Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // 2. Handle the Upload Process
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);

    try {
      // Step A: Create a unique name for the file so it doesn't overwrite others
      const uniqueFileName = `${Date.now()}-${imageFile.name}`;
      
      // Step B: Point to where we want to save it in Firebase Storage (e.g., 'gallery/my-photo.jpg')
      const storageReference = ref(storage, `gallery/${uniqueFileName}`);
      
      // Step C: Upload the physical image file to Firebase Storage
      await uploadBytes(storageReference, imageFile);
      
      // Step D: Get the public web link (URL) for the image we just uploaded
      const publicImageUrl = await getDownloadURL(storageReference);

      // Step E: Save the Title and the URL into the Firestore Database
      await addDoc(collection(db, 'gallery'), {
        title: title,
        date: date,
        imageUrl: publicImageUrl,
        createdAt: serverTimestamp(),
      });

      alert('Image uploaded successfully to the Gallery!');
      
      // Clear the form
      setTitle('');
      setDate('');
      setImageFile(null);
      
      // Reset the file input visually
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error("Error uploading image: ", error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-6 border-b pb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <ImagePlus className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Upload to Gallery</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Photo Title / Event Name</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="e.g., Easter Sunday 2026"
              required
            />
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date (Optional)</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Image File Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Image</label>
            <input 
              id="file-upload"
              type="file" 
              accept="image/*" // Only allow image files
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading || !imageFile}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
              </>
            ) : (
              'Upload Photo'
            )}
          </button>
        </form>
      </div>
    </AuthGuard>
  );
}