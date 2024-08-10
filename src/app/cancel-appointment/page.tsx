'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { db } from '@/app/lib/firebase'; // Adjust the import based on your file structure
import { doc, updateDoc } from 'firebase/firestore';

const CancelAppointment = () => {
    const [appointmentId, setAppointmentId] = useState<string>('');
    const [reason, setReason] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Extract appointment ID from URL parameters
        const params = new URLSearchParams(window.location.search);
        const id = params.get('appointmentId');
        if (id) {
            setAppointmentId(id);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!appointmentId) {
            setError('No appointment ID provided');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/cancel-appointment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ appointmentId, reason }),
            });

            const result = await response.json();

            if (response.ok) {
                // Show success message with SweetAlert2
                Swal.fire({
                    title: 'Success!',
                    text: 'Your appointment has been successfully canceled.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    // Redirect or perform any additional action after confirmation
                    router.push('/');
                });
            } else {
                setError(result.message || 'Failed to cancel the appointment.');
            }
        } catch (error) {
            console.error('Error canceling appointment:', error);
            setError('Failed to cancel the appointment. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4">Cancel Appointment</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Appointment ID"
                        value={appointmentId}
                        readOnly
                        className="p-2 border rounded w-full bg-gray-200 cursor-not-allowed"
                    />
                    <textarea
                        placeholder="Reason for cancellation"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        className="p-2 border rounded w-full h-24 resize-none"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-2 ${loading ? 'bg-blue-300' : 'bg-blue-500'} text-white rounded hover:bg-blue-600 transition-colors`}
                    >
                        {loading ? 'Processing...' : 'Cancel Appointment'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CancelAppointment;
