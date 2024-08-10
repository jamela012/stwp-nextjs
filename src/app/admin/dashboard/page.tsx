'use client';

import { FaEnvelope, FaBullhorn, FaCalendarAlt, FaImages, FaUsers, FaChartLine, FaCog, FaBell } from 'react-icons/fa';

export default function AdminDashboard() {
    return (
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 min-h-screen p-6">
            <header className="bg-white shadow-lg p-4 mb-6 rounded-lg">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            </header>

            <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                {/* Stats Overview */}
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-medium text-gray-600">Total Inquiries</h2>
                        <p className="text-2xl font-semibold text-gray-900">123</p>
                    </div>
                    <FaEnvelope className="text-blue-600 text-3xl" />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-medium text-gray-600">Upcoming Appointments</h2>
                        <p className="text-2xl font-semibold text-gray-900">8</p>
                    </div>
                    <FaCalendarAlt className="text-green-600 text-3xl" />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-medium text-gray-600">Announcements</h2>
                        <p className="text-2xl font-semibold text-gray-900">5</p>
                    </div>
                    <FaBullhorn className="text-yellow-600 text-3xl" />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-medium text-gray-600">Gallery Images</h2>
                        <p className="text-2xl font-semibold text-gray-900">45</p>
                    </div>
                    <FaImages className="text-red-600 text-3xl" />
                </div>
            </section>

            <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Inquiries */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <FaEnvelope className="text-blue-600 mr-2" /> Inquiries
                    </h2>
                    <p className="text-gray-700">Manage and review site inquiries here.</p>
                    <div className="mt-4">
                        <a href="/admin/inquiries" className="text-blue-600 hover:underline">View Inquiries</a>
                    </div>
                </div>

                {/* Announcements */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <FaBullhorn className="text-yellow-600 mr-2" /> Announcements
                    </h2>
                    <p className="text-gray-700">Manage and post announcements here.</p>
                    <div className="mt-4">
                        <a href="/admin/announcements" className="text-blue-600 hover:underline">View Announcements</a>
                    </div>
                </div>

                {/* Appointments */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <FaCalendarAlt className="text-green-600 mr-2" /> Appointments
                    </h2>
                    <p className="text-gray-700">Manage appointments and schedules here.</p>
                    <div className="mt-4">
                        <a href="/admin/appointments" className="text-blue-600 hover:underline">View Appointments</a>
                    </div>
                </div>

                {/* Gallery */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <FaImages className="text-red-600 mr-2" /> Gallery
                    </h2>
                    <p className="text-gray-700">Upload, manage, and review gallery images here.</p>
                    <div className="mt-4">
                        <a href="/admin/gallery" className="text-blue-600 hover:underline">View Gallery</a>
                    </div>
                </div>

                {/* User Management */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <FaUsers className="text-purple-600 mr-2" /> User Management
                    </h2>
                    <p className="text-gray-700">Manage site users and administrators here.</p>
                    <div className="mt-4">
                        <a href="/admin/users" className="text-blue-600 hover:underline">Manage Users</a>
                    </div>
                </div>

                {/* Reports/Analytics */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <FaChartLine className="text-pink-600 mr-2" /> Reports & Analytics
                    </h2>
                    <p className="text-gray-700">View site reports and analytics here.</p>
                    <div className="mt-4">
                        <a href="/admin/reports" className="text-blue-600 hover:underline">View Reports</a>
                    </div>
                </div>

                {/* Settings */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <FaCog className="text-teal-600 mr-2" /> Settings
                    </h2>
                    <p className="text-gray-700">Manage site settings here.</p>
                    <div className="mt-4">
                        <a href="/admin/settings" className="text-blue-600 hover:underline">Manage Settings</a>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <FaBell className="text-orange-600 mr-2" /> Notifications
                    </h2>
                    <p className="text-gray-700">Manage site notifications here.</p>
                    <div className="mt-4">
                        <a href="/admin/notifications" className="text-blue-600 hover:underline">Manage Notifications</a>
                    </div>
                </div>
            </main>
        </div>
    );
}
