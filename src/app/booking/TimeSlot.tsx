import { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface TimeSlotProps {
    date: Date;
    onTimeSlotSelection: (timeSlot: string) => void;
}

const TimeSlot = ({ date, onTimeSlotSelection }: TimeSlotProps) => {
    const [slots, setSlots] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const formatTime12Hour = (hour: number) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12; // Convert 0 to 12 for midnight
        return `${hour12}:00 ${period}`;
    };

    const formatDateToFirestore = (date: Date): string => {
        const philippineOffset = 8 * 60; // Philippines is UTC+8
        const localOffset = date.getTimezoneOffset();
        const offsetDifference = philippineOffset - localOffset;

        // Convert date to Philippine Time
        const localDate = new Date(date.getTime() + offsetDifference * 60 * 1000);

        // Set to midnight in Philippine time
        localDate.setUTCHours(0, 0, 0, 0);

        // Convert to local date string in YYYY-MM-DD format
        return localDate.toISOString().split('T')[0];
    };

    const handleTimeSlotClick = (timeSlot: string) => {
        setSelectedTime(timeSlot);
        onTimeSlotSelection(timeSlot); // Pass the selected time back to AppointmentManager
    };

    useEffect(() => {
        const fetchSlots = async () => {
            const dateStr = formatDateToFirestore(date);
            const appointmentsRef = collection(db, 'appointments');
            const q = query(appointmentsRef, where('date', '==', dateStr));
            const querySnapshot = await getDocs(q);

            const existingAppointments = querySnapshot.size;

            const times = [];
            for (let hour = 9; hour <= 16; hour++) {
                const time = formatTime12Hour(hour);
                if (existingAppointments < 2) {
                    times.push(time);
                }
            }
            setSlots(times);
        };

        fetchSlots();
    }, [date]);

    return (
<div>
    <h2 className="text-xl font-semibold mb-6">Available Time Slots for {date.toDateString()}</h2>
    <ul className="space-y-2">
        {slots.map(slot => (
            <li
                key={slot}
                className={`cursor-pointer text-sm p-3 border rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:bg-blue-50 ${
                    selectedTime === slot ? 'bg-blue-100 border-blue-300' : 'border-gray-300'
                }`}
                onClick={() => handleTimeSlotClick(slot)}
                role="button"
                aria-pressed={selectedTime === slot}
            >
                {slot}
            </li>
        ))}
    </ul>
</div>

    );
};

export default TimeSlot;
