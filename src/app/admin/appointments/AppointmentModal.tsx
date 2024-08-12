import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Appointment } from './type';
import { updateAppointmentByIdField } from './appointmentService';
import AppointmentCalendar from '@/app/booking/AppointmentCalendar';
import TimeSlot from '@/app/booking/TimeSlot';
import { useDisabledDates } from '../../booking/hooks/useDisabledDates';
import { formatDateToFirestore } from '@/app/booking/utils/dateUtils'; // Import date formatting function

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Partial<Appointment>) => void;
    title: string;
    appointmentData?: Partial<Appointment>;
}

const AppointmentModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, title, appointmentData }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(appointmentData?.date ? new Date(appointmentData.date) : null);
    const [time, setTime] = useState(appointmentData?.time || '');
    const [status, setStatus] = useState(appointmentData?.status || '');
    const [loading, setLoading] = useState(false);
    const disabledDates = useDisabledDates();

    const handleSave = async () => {
        if (appointmentData?.id) {
            setLoading(true);
            try {
                const formattedDate = selectedDate ? formatDateToFirestore(selectedDate) : '';
                await updateAppointmentByIdField(appointmentData.id, {
                    date: formattedDate,
                    time,
                    status,
                });

                // Send status update email
                const response = await fetch('/api/update-appointment-status', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: appointmentData.id,
                        status,
                        email: appointmentData.email, // Make sure this field exists
                        date: formattedDate,
                        time,
                    }),
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Appointment status updated and email sent successfully!',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'Failed to send the update email.',
                    });
                }

                onSave({ date: formattedDate, time, status });
                onClose(); // Close modal after saving
            } catch (error) {
                console.error('Error saving appointment:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while saving the appointment.',
                });
            } finally {
                setLoading(false);
            }
        } else {
            console.error('Appointment ID field is missing');
        }
    };

    const handleDateClick = (date: Date | null) => {
        setSelectedDate(date);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full flex flex-col max-h-[90vh] overflow-auto">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700 text-xl"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4 flex-1 flex flex-col overflow-y-auto">
                    <div className="mb-4">
                        <label className="block text-gray-700">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        >
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                            <option value="Rescheduled">Rescheduled</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                    </div>

                    {status === 'Rescheduled' && (
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <div className="mb-4 flex-1">
                                <label className="block text-gray-700">Date</label>
                                <AppointmentCalendar
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    disabledDates={disabledDates}
                                    onDateClick={handleDateClick}
                                    disabled={false}
                                />
                            </div>
                            <div className="mb-4 flex-1">
                                <label className="block text-gray-700">Time</label>
                                {selectedDate && (
                                    <TimeSlot
                                        date={selectedDate}
                                        onTimeSlotSelection={setTime}
                                        disabled={false}
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleSave}
                        className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentModal;
