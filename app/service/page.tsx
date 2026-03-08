import Navbar from '@/components/Navbar';

export default function ServicePage() {
    return (
        <main className="min-h-screen bg-white pt-20">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b pb-4">예배안내</h1>

                {/* Main Service Card */}
                {/* <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">예배안내</h2>
                    </div> */}
                    
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mb-8">
                    <div className="space-y-4 text-gray-700">
                        <h3 className="text-xl font-bold text-blue-800 mb-4">주일예배</h3>
                        <p className="flex items-center gap-2">
                            <span className="font-semibold w-24">Time:</span>
                            11:30 AM - 12:30 PM
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="font-semibold w-24">Location:</span>
                            Main Church
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="font-semibold w-24">Language:</span>
                            Korean
                        </p>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mb-8">
                    {/* <h2 className="text-2xl font-bold text-blue-900 mb-4">예배안내</h2> */}
                    
                    <div className="space-y-4 text-gray-700">
                        <h3 className="text-xl font-bold text-blue-800 mb-4">주일학교</h3>
                        <p className="flex items-center gap-2">
                            <span className="font-semibold w-24">Time:</span>
                            12:00 PM - 12:30 PM
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="font-semibold w-24">Location:</span>
                            Hall
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="font-semibold w-24">Language:</span>
                            Korean
                        </p>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mb-8">
                    <div className="space-y-4 text-gray-700">
                        <h3 className="text-xl font-bold text-blue-800 mb-4">금요기도회</h3>
                        <p className="flex items-center gap-2">
                            <span className="font-semibold w-24">Time:</span>
                            8:00 PM - 9:00 PM
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="font-semibold w-24">Location:</span>
                            Main Church
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="font-semibold w-24">Language:</span>
                            Korean
                        </p>
                    </div>
                </div>


                {/* Schedule Table */}
                <h3 className="text-xl font-bold text-gray-800 mb-4">Class Meeting</h3>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Sunday</td>
                                <td className="px-6 py-4 text-gray-500">Lounge</td>
                                <td className="px-6 py-4 text-gray-500">11:30 AM</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Monday</td>
                                <td className="px-6 py-4 text-gray-500">N/A</td>
                                <td className="px-6 py-4 text-gray-500">8:00 PM</td>
                            </tr>
                            {/* <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Friday</td>
                                <td className="px-6 py-4 text-gray-500">Youth Group</td>
                                <td className="px-6 py-4 text-gray-500">6:30 PM</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}