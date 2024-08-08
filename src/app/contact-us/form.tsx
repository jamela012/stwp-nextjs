'use client';

import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique IDs


// Define the FormData type
interface FormData {
    id: string; // Add ID field
    name: string;
    email: string;
    phone: string;
    eventtype: string;
    eventdate: string;
    subject: string;
    message: string;
    createdAt: Timestamp;
    read: boolean; // Add read field
}

// Define the dialog type
interface Dialog {
    isOpen: boolean;
    message: string;
    type: 'success' | 'error'; // Restrict type to 'success' or 'error'
}

export default function Form() {
    const [formData, setFormData] = useState<FormData>({
        id: uuidv4(), // Generate a unique ID
        name: '',
        email: '',
        phone: '',
        eventtype: '',
        eventdate: '',
        subject: '',
        message: '',
        createdAt: Timestamp.now(), // Initialize with current time
        read: false // Default value for read
    });

    const [dialog, setDialog] = useState<Dialog>({
        isOpen: false,
        message: '',
        type: 'success' // Default type to 'success'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Set the current date and time
        const now = Timestamp.now();
        setFormData(prevData => ({
            ...prevData,
            createdAt: now // Update the createdAt field
        }));

        try {
            await addDoc(collection(db, 'inquiries'), formData);
            setDialog({
                isOpen: true,
                message: 'Message sent successfully!',
                type: 'success',
            });
            setFormData({
                id: uuidv4(), // Generate a new unique ID for the next form
                name: '',
                email: '',
                phone: '',
                eventtype: '',
                eventdate: '',
                subject: '',
                message: '',
                createdAt: Timestamp.now(), // Reset after successful submission
                read: false // Default value for read
            });
        } catch (e) {
            console.error('Error adding document: ', e);
            setDialog({
                isOpen: true,
                message: 'Failed to send message. Please try again.',
                type: 'error',
            });
        }
    };

    return (
        <div className="flex-1">
            <form className="max-w-3xl w-full sm:p-0 p-4" onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-5">
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="text-gray-500 bg-[#0000000D] placeholder-gray-500 border border-transparent focus:border-transparent text-base rounded-sm block w-full p-4"
                        placeholder="Name"
                        required
                    />
                </div>
                {/* Email */}
                <div className="mb-5">
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="text-gray-500 bg-[#0000000D] placeholder-gray-500 border border-transparent focus:border-transparent text-base rounded-sm block w-full p-4"
                        placeholder="Email Address"
                        required
                    />
                </div>
                {/* Phone No. */}
                <div className="mb-5">
                    <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="text-gray-500 bg-[#0000000D] placeholder-gray-500 border border-transparent focus:border-transparent text-base rounded-sm block w-full p-4"
                        placeholder="Phone Number"
                        required
                    />
                </div>
                {/* Event type */}
                <div className="mb-5">
                    <input
                        type="text"
                        id="eventtype"
                        value={formData.eventtype}
                        onChange={handleChange}
                        className="text-gray-500 bg-[#0000000D] placeholder-gray-500 border border-transparent focus:border-transparent text-base rounded-sm block w-full p-4"
                        placeholder="Event Type"
                        required
                    />
                </div>
                {/* Event Date */}
                <div className="mb-5">
                    <input
                        type="text"
                        id="eventdate"
                        value={formData.eventdate}
                        onChange={handleChange}
                        className="text-gray-500 bg-[#0000000D] placeholder-gray-500 border border-transparent focus:border-transparent text-base rounded-sm block w-full p-4"
                        placeholder="Event Date"
                        required
                    />
                </div>
                {/* Subject */}
                <div className="mb-5">
                    <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="text-gray-500 bg-[#0000000D] placeholder-gray-500 border border-transparent focus:border-transparent text-base rounded-sm block w-full p-4"
                        placeholder="Subject"
                        required
                    />
                </div>
                {/* Message */}
                <div className="mb-5">
                    <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="text-gray-500 bg-[#0000000D] placeholder-gray-500 border border-transparent focus:border-transparent text-base rounded-sm block w-full p-4 h-44"
                        placeholder="Message"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="text-white bg-btn-color hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-base w-full sm:w-auto p-4 text-center dark:bg-btn-color dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Send Message
                    </button>
                </div>
            </form>
            {/* Dialog */}
            {dialog.isOpen && (
                <div className={`fixed inset-0 flex items-center justify-center ${dialog.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                    <div className={`bg-white p-6 rounded-lg shadow-lg ${dialog.type === 'success' ? 'border-green-500' : 'border-red-500'} border-2`}>
                        <h2 className={`text-lg font-semibold ${dialog.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                            {dialog.type === 'success' ? 'Success!' : 'Error!'}
                        </h2>
                        <p className="mt-2">{dialog.message}</p>
                        <button
                            onClick={() => setDialog({ ...dialog, isOpen: false })}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
