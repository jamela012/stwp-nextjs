'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { db } from '@/app/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const formatDateTime = (date: string, time: string) => {
    // Format the date assuming it's in a standard format like 'YYYY-MM-DD'
    const formattedDate = new Date(date).toLocaleDateString('en-US');

    // Convert time string to a 24-hour format for parsing
    const convertTo24Hour = (timeString: string) => {
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    // Format the time string (e.g., "2:00 PM") into a proper format
    const formattedTime = new Date(`1970-01-01T${convertTo24Hour(time)}:00Z`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    return { formattedDate, formattedTime };
};


const CancelAppointment = () => {
    const [appointmentId, setAppointmentId] = useState<string>('');
    const [reason, setReason] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [appointmentDetails, setAppointmentDetails] = useState<{ id: string; date: string; time: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('appointmentId');
        if (id) {
            setAppointmentId(id);
            fetchAppointmentDetails(id);
        }
    }, []);

    const fetchAppointmentDetails = async (id: string) => {
        try {
            const appointmentsRef = collection(db, 'appointments');
            const q = query(appointmentsRef, where('id', '==', id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0];
                const data = docSnap.data();
                setAppointmentDetails({
                    id: data.id,
                    date: data.date,
                    time: data.time,
                });
            } else {
                setError('Appointment not found.');
            }
        } catch (error) {
            setError('Failed to fetch appointment details. Please try again later.');
        }
    };

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
                Swal.fire({
                    title: 'Success!',
                    text: 'Your appointment has been successfully canceled.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    router.push('/');
                });
            } else {
                setError(result.message || 'Failed to cancel the appointment.');
            }
        } catch (error) {
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
                {appointmentDetails && (
                    <div className="mb-4">
                        {/* <p><strong>Appointment ID:</strong> {appointmentDetails.id}</p> */}
                        {
                            // Format the date and time
                            (() => {
                                const { formattedDate, formattedTime } = formatDateTime(appointmentDetails.date, appointmentDetails.time);
                                return (
                                    <>
                                        <p><strong>Date:</strong> {formattedDate}</p>
                                        <p><strong>Time:</strong> {formattedTime}</p>
                                    </>
                                );
                            })()
                        }
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
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
