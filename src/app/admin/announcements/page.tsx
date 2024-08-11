'use client';
import { useEffect, useState } from 'react';
import { db } from '@/app/lib/firebase'; // Ensure this import matches your setup
import { collection, query, onSnapshot } from 'firebase/firestore';
import AnnouncementList from './AnnouncementList'; // Make sure this import is correct
import CreateAnnouncementModal from './CreateAnnouncementModal'; // Import the CreateAnnouncementModal
import FullContentModal from './FullContentModal'; // Import the FullContentModal
import { Announcement } from './types'; // Import the Announcement type
import EditAnnouncementModal from './EditAnnouncementModal'; // Import the EditAnnouncementModal

export default function AdminAnnouncements() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const q = query(collection(db, 'announcements'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedAnnouncements = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Announcement[];
            setAnnouncements(fetchedAnnouncements);
        });

        return () => unsubscribe();
    }, []);

    const handleAnnouncementClick = (announcement: Announcement) => {
        setSelectedAnnouncement(announcement);
        setIsViewModalOpen(true);
    };

    const handleAnnouncementCreated = () => {
        setIsCreateModalOpen(false);
    };

    const handleAnnouncementUpdated = () => {
        setIsEditModalOpen(false); // Fix: Close the edit modal after update
        handleAnnouncementCreated(); // Optionally refresh announcements
    };

    const handleEditAnnouncement = (announcement: Announcement) => {
        setSelectedAnnouncement(announcement);
        setIsEditModalOpen(true);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Announcements</h2>
            <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-btn-color text-sm text-white p-2 rounded mb-4 hover:bg-blue-500"
            >
                Add Announcement
            </button>
            <AnnouncementList
                announcements={announcements}
                onAnnouncementClick={handleAnnouncementClick}
                onEditClick={handleEditAnnouncement}
            />
            {isCreateModalOpen && (
                <CreateAnnouncementModal
                    onClose={() => setIsCreateModalOpen(false)}
                    onAnnouncementCreated={handleAnnouncementCreated}
                />
            )}
            {isViewModalOpen && selectedAnnouncement && (
                <FullContentModal
                    announcement={selectedAnnouncement}
                    onClose={() => setIsViewModalOpen(false)}
                />
            )}
            {isEditModalOpen && selectedAnnouncement && (
                <EditAnnouncementModal
                    announcement={selectedAnnouncement}
                    onClose={() => setIsEditModalOpen(false)}
                    onAnnouncementUpdated={handleAnnouncementUpdated}
                />
            )}
        </div>
    );
}
