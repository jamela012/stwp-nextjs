'use client';


export default function AdminDashboard() {
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <header className="bg-white shadow-md p-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            </header>

            <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Inquiries */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Inquiries</h2>
                    <p className="text-gray-700">Manage and review site inquiries here.</p>
                    <div className="mt-4">
                        <a href="/admin/inquiries" className="text-blue-600 hover:underline">View Inquiries</a>
                    </div>
                </div>

                {/* Announcements */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Announcements</h2>
                    <p className="text-gray-700">Manage and post announcements here.</p>
                    <div className="mt-4">
                        <a href="/admin/announcements" className="text-blue-600 hover:underline">View Announcements</a>
                    </div>
                </div>

                {/* Appointments */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Appointments</h2>
                    <p className="text-gray-700">Manage appointments and schedules here.</p>
                    <div className="mt-4">
                        <a href="/admin/appointments" className="text-blue-600 hover:underline">View Appointments</a>
                    </div>
                </div>

                {/* Gallery */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Gallery</h2>
                    <p className="text-gray-700">Upload, manage, and review gallery images here.</p>
                    <div className="mt-4">
                        <a href="/admin/gallery" className="text-blue-600 hover:underline">View Gallery</a>
                    </div>
                </div>
            </main>
        </div>
    );
}
