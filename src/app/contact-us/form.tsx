'use client';

import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique IDs
import Swal from 'sweetalert2'; // Import SweetAlert2

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

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Message sent successfully!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Close'
            });

            // Reset form data after successful submission
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

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to send message. Please try again.',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Close'
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
                        className="text-white bg-btn-color hover:bg-orange-500 transition-colors duration-300 focus:ring-4 focus:outline-none font-medium rounded-sm text-base w-full sm:w-auto p-4 text-center dark:bg-btn-color">
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
}
