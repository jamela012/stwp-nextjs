'use client';

import { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, query, onSnapshot, doc, updateDoc, getDoc, getDocs, where, deleteDoc } from 'firebase/firestore';
import { Inquiry } from './types';
import InquiryModal from './InquiryModal';

export default function AdminInquiries() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    useEffect(() => {
        const q = query(collection(db, 'inquiries'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const inquiriesData: Inquiry[] = [];
            querySnapshot.forEach((docSnapshot) => {
                const data = docSnapshot.data() as Omit<Inquiry, 'id'>; // Exclude 'id' from the data
                inquiriesData.push({ id: docSnapshot.id, ...data });
            });
            setInquiries(inquiriesData);
        });

        return () => unsubscribe();
    }, []);

    const handleInquiryClick = async (inquiry: Inquiry) => {
        console.log('Selected Inquiry ID:', inquiry.id); // Log the ID

        try {
            // Query to find the document with the matching field
            const q = query(collection(db, 'inquiries'), where('id', '==', inquiry.id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0]; // Assuming there's only one document with the matching criteria
                const inquiryRef = doc(db, 'inquiries', docSnap.id);

                if (!inquiry.read) {
                    await updateDoc(inquiryRef, { read: true });
                    console.log('Inquiry marked as read:', inquiry.id);
                }
                setSelectedInquiry({ id: docSnap.id, ...docSnap.data() } as Inquiry);
            } else {
                console.error('No such document!');
            }
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    const handleCloseModal = () => {
        setSelectedInquiry(null);
    };

    const handleDeleteInquiry = async (inquiryId: string) => {
        console.log('Attempting to delete inquiry with ID:', inquiryId); // Log the ID
    
        try {
            const docRef = doc(db, 'inquiries', inquiryId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                await deleteDoc(docRef);
                console.log('Inquiry deleted:', inquiryId);
                // Update state to remove deleted inquiry
                setInquiries((prevInquiries) => prevInquiries.filter((inquiry) => inquiry.id !== inquiryId));
            } else {
                console.error('No such document!');
            }
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };
    
    
    

    return (
        <div className="p-5">
            <h1 className="text-4xl font-semibold mb-5">Inquiries</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subject
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {inquiries.map((inquiry) => (
                            <tr
                                key={inquiry.id}
                                onClick={() => handleInquiryClick(inquiry)}
                                className={`cursor-pointer ${inquiry.read ? 'bg-gray-100' : 'bg-yellow-100'}`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {inquiry.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {inquiry.subject}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {inquiry.read ? 'Read' : 'Unread'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedInquiry && (
                <InquiryModal
                    inquiry={selectedInquiry}
                    onClose={handleCloseModal}
                    onDelete={handleDeleteInquiry}
                />
            )}
        </div>
    );
}
