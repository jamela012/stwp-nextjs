import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Close } from '@mui/icons-material';

interface AppointmentFormProps {
    date: Date;
    time: string;
    appointmentId: string;
    onClose: () => void;
    onSubmit: (formData: any) => Promise<void>;
    disabled: boolean; // Add disabled prop
}

const AppointmentForm = ({ date, time, appointmentId, disabled, onClose, onSubmit }: AppointmentFormProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [event, setEvent] = useState('');
    const [address, setAddress] = useState('');
    const [church, setChurch] = useState('');
    const [receptionArea, setReceptionArea] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState<number | ''>('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!name || !email || !phone || !event || !address || !receptionArea || numberOfGuests === '') {
            Swal.fire({
                icon: 'error',
                title: 'Incomplete Form',
                text: 'Please fill out all required fields.',
                showConfirmButton: true,
            });
            return;
        }
    
        setLoading(true); // Set loading to true when submission starts
    
        try {
            await onSubmit({
                date,
                time,
                name,
                email,
                phone,
                event,
                address,
                church,
                receptionArea,
                numberOfGuests,
                message,
                id: appointmentId,
                createdAt: new Date().toISOString(), // Add timestamp here
            });
    
            // Show success alert and close the form only after confirmation
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Appointment booked successfully!',
                showConfirmButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    onClose(); // Close the form after confirmation
                }
            });
    
        } catch (error) {
            console.error('Error booking appointment:', error);
    
            // Show error alert and keep the form open
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Failed to book appointment. Please check your internet connection.',
                showConfirmButton: true,
            });
    
        } finally {
            setLoading(false); // Set loading to false after submission ends
        }
    };
    
    
    return (
        <div className="p-2 border rounded-lg mx-auto relative">
            <Close onClick={onClose} className="mt-4 text-gray-400 text-md hover:text-gray-600 cursor-pointer absolute top-0 right-2" />
            <div className='mt-7 p-2'>
                <h2 className="text-lg font-semibold">Book an Appointment</h2>
                <p className="text-gray-400 font-semibold mb-5">Fill out the form.</p>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        required
                        className="w-full p-2 border rounded md:col-span-1"
                        disabled={disabled} // Disable input if form is disabled
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="w-full p-2 border rounded md:col-span-1"
                        disabled={disabled} // Disable input if form is disabled
                    />
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number"
                        required
                        className="w-full p-2 border rounded md:col-span-1"
                        disabled={disabled} // Disable input if form is disabled
                    />
                    <input
                        type="text"
                        value={event}
                        onChange={(e) => setEvent(e.target.value)}
                        placeholder="Event"
                        required
                        className="w-full p-2 border rounded md:col-span-1"
                        disabled={disabled} // Disable input if form is disabled
                    />
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        required
                        className="w-full p-2 border rounded md:col-span-2"
                        disabled={disabled} // Disable input if form is disabled
                    />
                    <input
                        type="text"
                        value={church}
                        onChange={(e) => setChurch(e.target.value)}
                        placeholder="Church (optional)"
                        className="w-full p-2 border rounded md:col-span-1"
                        disabled={disabled} // Disable input if form is disabled
                    />
                    <input
                        type="text"
                        value={receptionArea}
                        onChange={(e) => setReceptionArea(e.target.value)}
                        placeholder="Reception Area"
                        required
                        className="w-full p-2 border rounded md:col-span-1"
                        disabled={disabled} // Disable input if form is disabled
                    />
                    <input
                        type="number"
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                        placeholder="Number of Guests"
                        required
                        className="w-full p-2 border rounded md:col-span-1"
                        disabled={disabled} // Disable input if form is disabled
                    />
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message"
                        className="w-full p-2 border rounded md:col-span-2"
                        disabled={disabled} // Disable textarea if form is disabled
                    />
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded col-span-2">
                        {loading ? 'Submitting...' : 'Submit'} {/* Show loading state */}
                    </button>
                </form>
                {loading && <div className="loading-spinner">Loading...</div>} {/* Show loading spinner */}
            </div>
        </div>
    );
};

export default AppointmentForm;
