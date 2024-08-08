'use client';
import { useState } from 'react';
import { Close } from '@mui/icons-material';

interface AppointmentFormProps {
    date: Date;
    time: string;
    onClose: () => void;
    onSubmit: (formData: any) => Promise<void>;
}

const AppointmentForm = ({ date, time, onClose, onSubmit }: AppointmentFormProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [event, setEvent] = useState('');
    const [address, setAddress] = useState('');
    const [church, setChurch] = useState('');
    const [receptionArea, setReceptionArea] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState<number | ''>('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !phone || !event || !address || !receptionArea || numberOfGuests === '') {
            alert('Please fill out all required fields.');
            return;
        }

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
            });
            onClose(); // Close the form after submission
        } catch (error) {
            console.error('Error booking appointment:', error);
        }
    };

    return (
        <div className="p-2 border rounded-lg mx-auto relative">
            <Close onClick={onClose} className="mt-4 text-gray-400 text-md hover:text-gray-600 cursor-pointer absolute top-0 right-2" />
            <div className='mt-7 p-2'>
                <h2 className="text-lg font-semibold">Book an Appointment</h2>
                <p className="text-gray-400 font-semibold mb-5">Fill-out the form.</p>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        required
                        className="w-full p-2 border rounded md:col-span-1"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="w-full p-2 border rounded md:col-span-1"
                    />
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number"
                        required
                        className="w-full p-2 border rounded md:col-span-1"
                    />
                    <input
                        type="text"
                        value={event}
                        onChange={(e) => setEvent(e.target.value)}
                        placeholder="Event"
                        required
                        className="w-full p-2 border rounded md:col-span-1"
                    />
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        required
                        className="w-full p-2 border rounded md:col-span-2"
                    />
                    <input
                        type="text"
                        value={church}
                        onChange={(e) => setChurch(e.target.value)}
                        placeholder="Church (optional)"
                        className="w-full p-2 border rounded md:col-span-1"
                    />
                    <input
                        type="text"
                        value={receptionArea}
                        onChange={(e) => setReceptionArea(e.target.value)}
                        placeholder="Reception Area"
                        required
                        className="w-full p-2 border rounded md:col-span-1"
                    />
                    <input
                        type="number"
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                        placeholder="Number of Guests"
                        required
                        className="w-full p-2 border rounded md:col-span-1"
                    />
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message"
                        className="w-full p-2 border rounded md:col-span-2"
                    />
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded col-span-2">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AppointmentForm;
