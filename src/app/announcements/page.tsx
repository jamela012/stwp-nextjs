'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '@/app/lib/firebase'; // adjust the path as necessary
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

interface Announcement {
    id: string;
    title: string;
    content: string;
    timestamp: any;
    imageUrls: string[];
}

export default function Announcements() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'announcements'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Announcement[];
            setAnnouncements(data);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="max-w-[80%] mx-auto px-4 py-8 relative top-20">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Announcements</h1>

            {announcements.length === 0 ? (
                <div className='h-[500px] flex justify-center items-center'>
                    <p className="text-center font-bold text-xl text-gray-500">No announcements available at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {announcements.map((announcement) => (
                        <Link
                            key={announcement.id}
                            href={`/announcements/${announcement.id}`}
                            className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:bg-orange-50 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                        >
                            <div className="relative w-full h-64">
                                <Image
                                    src={announcement.imageUrls[0] || '/thumbnail.jpg'}
                                    alt={announcement.title}
                                    width={600}
                                    height={400}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="p-6 flex flex-col h-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">{announcement.title}</h2>
                                <p className="text-gray-700 text-sm mb-4 flex-1 overflow-hidden" dangerouslySetInnerHTML={{ __html: announcement.content }}></p>
                                <span className="text-gray-500 text-xs">{new Date(announcement.timestamp.seconds * 1000).toLocaleDateString()}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
