// components/Modal.tsx

import React, { useState, useEffect } from 'react';
import { Appointment } from './type';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Partial<Appointment>) => void;
    title: string;
    appointmentData?: Partial<Appointment>; // Marked as optional
    // children: React.ReactNode;
}

const AppointmentModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, title, appointmentData }) => {
    const [date, setDate] = useState(appointmentData?.date || '');
    const [time, setTime] = useState(appointmentData?.time || '');
    const [status, setStatus] = useState(appointmentData?.status || '');

    useEffect(() => {
        if (appointmentData) {
            setDate(appointmentData.date || '');
            setTime(appointmentData.time || '');
            setStatus(appointmentData.status || '');
        }
    }, [appointmentData]);

    const handleSave = () => {
        onSave({ date, time, status });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        >
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                    </div>
                    <button
                        onClick={handleSave}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentModal;
