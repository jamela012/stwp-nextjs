import { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface TimeSlotProps {
    date: Date;
    onTimeSlotSelection: (timeSlot: string) => void;
    disabled: boolean;
}

const TimeSlot = ({ date, onTimeSlotSelection, disabled }: TimeSlotProps) => {
    const [slots, setSlots] = useState<{ time: string; disabled: boolean }[]>([]);
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
        if (!disabled) {
            setSelectedTime(timeSlot);
            onTimeSlotSelection(timeSlot); // Pass the selected time back to AppointmentManager
        }
    };

    useEffect(() => {
        const fetchSlots = async () => {
            const dateStr = formatDateToFirestore(date);
            const appointmentsRef = collection(db, 'appointments');
            const q = query(appointmentsRef, where('date', '==', dateStr));
            const querySnapshot = await getDocs(q);

            // Create a map to track occupied slots
            const occupiedSlots: Set<string> = new Set();
            querySnapshot.forEach(doc => {
                const appointment = doc.data();
                const timeSlot = appointment.time;
                occupiedSlots.add(timeSlot);
            });

            // Generate time slots and check if they are occupied
            const times = [];
            for (let hour = 9; hour <= 16; hour++) {
                const time = formatTime12Hour(hour);
                times.push({ time, disabled: occupiedSlots.has(time) });
            }
            setSlots(times);
        };

        fetchSlots();
    }, [date]);

    return (
        <div className="p-4 bg-white rounded-lg border shadow-md w-full">
            <h2 className="text-xl font-semibold mb-6">Available Time Slots for {date.toDateString()}</h2>
            <ul className="space-y-2">
                {slots.map(({ time, disabled }) => (
                    <li
                        key={time}
                        className={`cursor-pointer text-sm p-3 border rounded-lg shadow-sm transition-transform transform hover:scale-105 ${
                            disabled
                                ? 'bg-red-100 border-red-300 text-red-500'
                                : selectedTime === time
                                ? 'bg-blue-100 border-blue-300'
                                : 'border-gray-300 hover:bg-blue-100'
                        }`}
                        onClick={() => handleTimeSlotClick(time)}
                        role="button"
                        aria-pressed={selectedTime === time}
                        style={{ pointerEvents: disabled || disabled ? 'none' : 'auto' }} // Disable interactions if disabled
                    >
                        {time}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TimeSlot;
