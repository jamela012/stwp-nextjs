// app/announcements/[id]/page.tsx
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';

interface Announcement {
    title: string;
    content: string; // HTML content
    timestamp: any;
    imageUrls: string[]; // Ensure this is an array
}

async function fetchAnnouncement(id: string): Promise<Announcement | null> {
    const docRef = doc(db, 'announcements', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as Announcement;
    } else {
        return null;
    }
}

export default async function AnnouncementDetail({ params }: { params: { id: string } }) {
    const announcement = await fetchAnnouncement(params.id);

    if (!announcement) {
        return <p className="text-center text-red-500 font-bold">Announcement not found.</p>;
    }

    return (
        <div className="max-w-[80%] mx-auto px-4 py-8 relative top-20 mb-32">
            <Link href={'/announcements'}>
                <p className='font-extrabold text-2xl hover:text-gray-900 text-gray-700 mb-5'>&larr;</p>
            </Link>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">{announcement.title}</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <div className="relative">
                        {announcement.imageUrls.length > 0 && (
                            announcement.imageUrls.map((url, index) => (
                                <div key={index} className="relative w-full h-72 mb-3 rounded-lg overflow-hidden shadow-md">
                                    <Image
                                        src={url || '/thumbnail.jpg'}
                                        alt={`Announcement image ${index + 1}`}
                                        className="object-cover w-full h-full"
                                        fill
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <div className="prose prose-lg leading-relaxed max-w-full">
                        <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
