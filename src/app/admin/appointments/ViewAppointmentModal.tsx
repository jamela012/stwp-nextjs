// components/ViewAppointmentModal.tsx
import React from 'react';
import { Appointment } from './type';

interface ViewAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointmentData: Appointment;
}

const ViewAppointmentModal: React.FC<ViewAppointmentModalProps> = ({
    isOpen,
    onClose,
    appointmentData,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Details</h2>
                <div>
                    <p><strong>Name:</strong> {appointmentData.name}</p>
                    <p><strong>Email:</strong> {appointmentData.email}</p>
                    <p><strong>Phone:</strong> {appointmentData.phone}</p>
                    <p><strong>Event:</strong> {appointmentData.event}</p>
                    <p><strong>Date:</strong> {appointmentData.date}</p>
                    <p><strong>Time:</strong> {appointmentData.time}</p>
                    <p><strong>Status:</strong> {appointmentData.status}</p>
                    <p><strong>Address:</strong> {appointmentData.address}</p>
                    {appointmentData.church && <p><strong>Church:</strong> {appointmentData.church}</p>}
                    {appointmentData.receptionArea && <p><strong>Reception Area:</strong> {appointmentData.receptionArea}</p>}
                    <p><strong>Message:</strong> {appointmentData.message}</p>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewAppointmentModal;
