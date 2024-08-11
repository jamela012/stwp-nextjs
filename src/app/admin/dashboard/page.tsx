'use client';
import { useEffect, useState } from 'react';
import { FaEnvelope, FaBullhorn, FaCalendarAlt, FaImages } from 'react-icons/fa';
import { db } from '@/app/lib/firebase';
import { collection, onSnapshot, orderBy, query, where, limit } from 'firebase/firestore';
import { formatDateToFirestore } from '@/app/booking/utils/dateUtils'; // Import your date utility function
import { Timestamp } from 'firebase/firestore';

function formatTimestampToDateString(timestamp: { toDate: () => any; }) {
    if (timestamp instanceof Timestamp) {
        const date = timestamp.toDate();

        // Format the date part
        const dateString = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

        // Format the time part
        const timeString = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        return { dateString, timeString };
    }
    return { dateString: '', timeString: '' };
}


export default function AdminDashboard() {
    const [totalInquiries, setTotalInquiries] = useState(0);
    const [unreadInquiries, setUnreadInquiries] = useState(0);
    const [upcomingAppointments, setUpcomingAppointments] = useState(0);
    const [totalAnnouncements, setTotalAnnouncements] = useState(0);
    const [totalGalleryImages, setTotalGalleryImages] = useState(0);
    const [topAppointments, setTopAppointments] = useState<any[]>([]);
    const [recentInquiries, setRecentInquiries] = useState<any[]>([]);

    useEffect(() => {
        // Listen for changes in the inquiries collection
        const inquiriesCollection = collection(db, 'inquiries');

        const unsubscribeInquiries = onSnapshot(
            query(inquiriesCollection, orderBy('createdAt', 'desc'), limit(5)),
            snapshot => {
                setTotalInquiries(snapshot.size);

                const unreadSnapshot = snapshot.docs.filter(doc => doc.data().read === false);
                setUnreadInquiries(unreadSnapshot.length);

                const recentInquiriesData = snapshot.docs.map(doc => doc.data());
                setRecentInquiries(recentInquiriesData);
            }
        );

        // Listen for changes in the appointments collection
        const appointmentsCollection = collection(db, 'appointments');
        const today = new Date();
        const todayString = formatDateToFirestore(today);

        const unsubscribeAppointments = onSnapshot(
            query(appointmentsCollection, where('date', '>=', todayString), orderBy('date', 'asc'), limit(5)),
            snapshot => {
                setUpcomingAppointments(snapshot.size);

                const topAppointmentsData = snapshot.docs.map(doc => doc.data());
                setTopAppointments(topAppointmentsData);
            }
        );

        // Listen for changes in the announcements collection
        const announcementsCollection = collection(db, 'announcements');
        const unsubscribeAnnouncements = onSnapshot(announcementsCollection, snapshot => {
            setTotalAnnouncements(snapshot.size);
        });

        // Listen for changes in the gallery images collection
        const galleryCollection = collection(db, 'images');
        const unsubscribeGalleryImages = onSnapshot(galleryCollection, snapshot => {
            setTotalGalleryImages(snapshot.size);
        });

        // Cleanup subscriptions on component unmount
        return () => {
            unsubscribeInquiries();
            unsubscribeAppointments();
            unsubscribeAnnouncements();
            unsubscribeGalleryImages();
        };
    }, []);

    return (
        <div className="min-h-screen p-6">
            <header className="bg-white shadow-lg p-4 mb-6 rounded-lg">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </header>

            <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                {/* Stats Overview */}
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-medium text-gray-600">Total Inquiries</h2>
                        <p className="text-2xl font-semibold text-gray-900">{totalInquiries}</p>
                        <p className="text-sm text-red-500">Unread: {unreadInquiries}</p>
                    </div>
                    <FaEnvelope className="text-blue-600 text-3xl" />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-medium text-gray-600">Upcoming Appointments</h2>
                        <p className="text-2xl font-semibold text-gray-900">{upcomingAppointments}</p>
                    </div>
                    <FaCalendarAlt className="text-green-600 text-3xl" />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-medium text-gray-600">Announcements</h2>
                        <p className="text-2xl font-semibold text-gray-900">{totalAnnouncements}</p>
                    </div>
                    <FaBullhorn className="text-yellow-600 text-3xl" />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-medium text-gray-600">Gallery Images</h2>
                        <p className="text-2xl font-semibold text-gray-900">{totalGalleryImages}</p>
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
            </main>

            {/* Appointments and Inquiries Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-10">
                {/* Upcoming Appointments */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Upcoming Appointments</h2>
                    <div>
                        {topAppointments.length === 0 ? (
                            <p className="text-gray-600">No upcoming appointments.</p>
                        ) : (
                            <ul>
                                {topAppointments.map((appointment, index) => (
                                    <li key={index} className="border-b last:border-b-0 py-4 bg-gray-50 px-2">
                                        <div className="flex justify-between">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{appointment.name}</p>
                                                <p className="text-sm text-gray-600">{appointment.email}</p>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-600">{appointment.date}</p>
                                                <p className="text-sm text-gray-600">{appointment.time}</p>
                                            </div>
                                            <div className="text-right flex items-center">
                                                <p className="text-sm text-gray-600">{appointment.status}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Recent Inquiries */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Recent Inquiries</h2>
                    <div>
                        {recentInquiries.length === 0 ? (
                            <p className="text-gray-600">No recent inquiries.</p>
                        ) : (
                            <ul>
                                {recentInquiries.map((inquiry, index) => (
                                    <li key={index} className={`border-b last:border-b-0 py-4 px-2 ${inquiry.read ? 'bg-gray-50' : 'bg-orange-50'}`}>
                                        <div className="flex justify-between">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{inquiry.name}</p>
                                                <p className="text-sm text-gray-600">{inquiry.email}</p>
                                            </div>
                                            <div className="text-left flex-1">
                                                <p className="text-sm text-gray-600">{inquiry.subject}</p>
                                                <p className={`text-sm ${inquiry.read ? 'text-green-600' : 'text-red-600'}`}>
                                                    {inquiry.read ? 'Read' : 'Unread'}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">{formatTimestampToDateString(inquiry.createdAt).dateString}</p>
                                                <p className="text-sm text-gray-600">{formatTimestampToDateString(inquiry.createdAt).timeString}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </section>


        </div>
    );
}