'use client';

import { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, where, getDocs } from 'firebase/firestore';
import { Inquiry } from './types';
import InquiryModal from './InquiryModal';
import { Timestamp } from 'firebase/firestore';
import Swal from 'sweetalert2';

function formatTimestampToDateString(timestamp: Timestamp) {
    if (timestamp) {
        const date = timestamp.toDate();
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    }
    return '';
}

export default function AdminInquiries() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        const q = query(collection(db, 'inquiries'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const inquiriesData: Inquiry[] = [];
            querySnapshot.forEach((docSnapshot) => {
                const data = docSnapshot.data() as Omit<Inquiry, 'id'>;
                inquiriesData.push({ id: docSnapshot.id, ...data });
            });

            // Sort inquiries by createdAt in descending order
            inquiriesData.sort((a, b) => (b.createdAt as Timestamp).toMillis() - (a.createdAt as Timestamp).toMillis());

            setInquiries(inquiriesData);
        });

        return () => unsubscribe();
    }, []);

    const handleInquiryClick = async (inquiry: Inquiry) => {
        // Do nothing if checkboxes are being selected
        if (selectedIds.size > 0) return;

        try {
            const q = query(collection(db, 'inquiries'), where('id', '==', inquiry.id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0];
                const inquiryRef = doc(db, 'inquiries', docSnap.id);

                if (!inquiry.read) {
                    await updateDoc(inquiryRef, { read: true });
                }
                setSelectedInquiry({ id: docSnap.data().id, ...docSnap.data() } as Inquiry);
            } else {
                console.error('No such document!');
            }
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    const handleCheckboxChange = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation(); // Prevent triggering row click
        setSelectedIds((prevSelectedIds) => {
            const newSelectedIds = new Set(prevSelectedIds);
            if (newSelectedIds.has(id)) {
                newSelectedIds.delete(id);
            } else {
                newSelectedIds.add(id);
            }
            return newSelectedIds;
        });
    };

    const handleDeleteSelected = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        });

        if (result.isConfirmed) {
            try {
                await Promise.all(
                    Array.from(selectedIds).map(async (id) => {
                        const q = query(collection(db, 'inquiries'), where('id', '==', id));
                        const querySnapshot = await getDocs(q);

                        if (!querySnapshot.empty) {
                            const docRef = doc(db, 'inquiries', querySnapshot.docs[0].id);
                            await deleteDoc(docRef);
                        }
                    })
                );

                setInquiries((prevInquiries) =>
                    prevInquiries.filter((inquiry) => !selectedIds.has(inquiry.id))
                );
                setSelectedIds(new Set());
                Swal.fire('Deleted!', 'Your selected inquiries have been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting documents:', error);
                Swal.fire('Error!', 'There was an error deleting the inquiries.', 'error');
            }
        }
    };

    const handleCloseModal = () => {
        setSelectedInquiry(null);
    };

    return (
        <div className="p-5">
            <h1 className="text-4xl font-semibold mb-5">Inquiries</h1>
            <div className="flex justify-between items-center mb-4">
                {selectedIds.size > 0 && (
                    <button
                        onClick={handleDeleteSelected}
                        className="bg-red-500 text-sm text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                )}
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={selectedIds.size === inquiries.length}
                                    onChange={() => {
                                        if (selectedIds.size === inquiries.length) {
                                            setSelectedIds(new Set());
                                        } else {
                                            setSelectedIds(new Set(inquiries.map((inquiry) => inquiry.id)));
                                        }
                                    }}
                                />
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subject
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Received on
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {inquiries.map((inquiry) => (
                            <tr
                                key={inquiry.id}
                                onClick={(e) => {
                                    // Only open modal if clicked outside of checkbox
                                    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
                                        return;
                                    }
                                    handleInquiryClick(inquiry);
                                }}
                                className={`cursor-pointer ${inquiry.read ? 'bg-gray-100' : 'bg-yellow-100'}`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        checked={selectedIds.has(inquiry.id)}
                                        onChange={(e) => handleCheckboxChange(inquiry.id, e)}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {inquiry.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {inquiry.subject}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatTimestampToDateString(inquiry.createdAt)}
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
                    onDelete={() => handleDeleteSelected()} // Single delete via modal
                />
            )}
        </div>
    );
}
