'use client';

import { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import AppointmentCalendar from './AppointmentCalendar';
import TimeSlot from './TimeSlot';
import AppointmentForm from './AppointmentForm';
import Swal from 'sweetalert2';
import EventIcon from '@mui/icons-material/Event';
import { CalendarToday } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';

const AppointmentManager = () => {
    const [disabledDates, setDisabledDates] = useState<Set<string>>(new Set());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

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

    useEffect(() => {
        const fetchDisabledDates = async () => {
            const appointmentsRef = collection(db, 'appointments');
            const q = query(appointmentsRef);
            const querySnapshot = await getDocs(q);

            const dateCountMap: Record<string, number> = {};

            querySnapshot.forEach(doc => {
                const data = doc.data();
                const dateStr = data.date;
                if (!dateCountMap[dateStr]) {
                    dateCountMap[dateStr] = 0;
                }
                dateCountMap[dateStr]++;
            });

            const disabled = new Set(
                Object.keys(dateCountMap).filter(dateStr => dateCountMap[dateStr] >= 2)
            );

            setDisabledDates(disabled);
        };

        fetchDisabledDates();
    }, []);

    useEffect(() => {
        // Close the form if the selected date is disabled
        if (selectedDate && disabledDates.has(formatDateToFirestore(selectedDate))) {
            setShowForm(false);
            setSelectedTime(null); // Reset selected time when form is closed
        }
    }, [disabledDates, selectedDate]);

    const updateDisabledDates = (newDisabledDates: Set<string>) => {
        setDisabledDates(newDisabledDates);
    };

    const handleDateClick = (date: Date | null) => {
        if (date) {
            const dateStr = formatDateToFirestore(date);
            if (disabledDates.has(dateStr)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fully Booked',
                    text: 'This date is fully booked.',
                });
                setSelectedDate(null); // Clear the selected date if fully booked
                setShowForm(false); // Ensure form is closed
            } else {
                setSelectedDate(date);
                setSelectedTime(null); // Reset time selection
                setShowForm(false); // Ensure form is closed when date is reselected
            }
        } else {
            setSelectedDate(null);
            setSelectedTime(null); // Reset time selection
            setShowForm(false); // Ensure form is closed
        }
    };

    const handleTimeSlotSelection = (timeSlot: string) => {
        if (selectedDate) {
            setSelectedTime(timeSlot);
            setShowForm(true); // Show the form when a time slot is selected
            setSelectedTime(timeSlot); // Update the selected time state
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setSelectedTime(null); // Reset selected time
    };

    const handleAppointmentSubmission = async (formData: any) => {
        try {
            const dateStr = formatDateToFirestore(selectedDate as Date);

            await addDoc(collection(db, 'appointments'), {
                date: dateStr,
                time: formData.time,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                event: formData.event,
                address: formData.address,
                church: formData.church,
                receptionArea: formData.receptionArea,
                numberOfGuests: formData.numberOfGuests,
                message: formData.message,
            });

            // Update the disabled dates
            const appointmentsRef = collection(db, 'appointments');
            const q = query(appointmentsRef);
            const querySnapshot = await getDocs(q);

            const dateCountMap: Record<string, number> = {};

            querySnapshot.forEach(doc => {
                const data = doc.data();
                const dateStr = data.date;
                if (!dateCountMap[dateStr]) {
                    dateCountMap[dateStr] = 0;
                }
                dateCountMap[dateStr]++;
            });

            const disabled = new Set(
                Object.keys(dateCountMap).filter(dateStr => dateCountMap[dateStr] >= 2)
            );

            updateDisabledDates(disabled);

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Appointment booked successfully!',
            });
        } catch (error) {
            console.error('Error booking appointment:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to book appointment.',
            });
        }
    };

    return (
        <div className="relative top-20">
            <div className='mb-32'>
                <div className="md:w-[80%] flex flex-col md:flex-row p-4 mx-auto flex-wrap">
                    <div className="p-6 max-w-md mx-auto bg-white border rounded-lg flex flex-col justify-center space-y-4 relative">
                        <div className="absolute top-5">
                            <Link href={'/contact-us'}>
                                <ArrowBack className='text-black' />
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2 pb-3 border-b">
                            <h1 className="text-3xl font-bold text-gray-900">Shepherd The Wedding Planner</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CalendarToday className="text-gray-500 text-xl" />
                            <h1 className="text-2xl font-semibold text-gray-800">Appointment</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <AccessTimeIcon className="text-gray-500 text-xl" />
                            <h3 className="text-base font-normal text-gray-700">1 hour</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                            <LocationOnIcon className="text-gray-500 text-xl" />
                            <h3 className="text-base font-normal text-gray-600">
                                Q38F+C5Q Don Florencio Village, Gov. Antonio Carpio Rd, Batangas, 4200 Batangas
                            </h3>
                        </div>
                        {/* Display selected date and time here */}
                        {selectedDate && (
                            <div className="flex items-center space-x-2">
                                <EventIcon className="text-gray-500 text-xl" />
                                <h3 className="text-base font-normal text-gray-600">
                                    {selectedDate.toDateString()} {selectedTime && `at ${selectedTime}`}
                                </h3>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 bg-white p-4 rounded-lg border">
                        <AppointmentCalendar
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            disabledDates={disabledDates}
                            onDateClick={handleDateClick} // Pass handleDateClick to AppointmentCalendar
                        />
                    </div>
                    {selectedDate && !disabledDates.has(formatDateToFirestore(selectedDate)) && (
                        <div className="flex-1 bg-white p-4 rounded-lg border">
                            <TimeSlot
                                date={selectedDate}
                                onTimeSlotSelection={handleTimeSlotSelection}
                            />
                        </div>
                    )}
                </div>
                {showForm && selectedDate && selectedTime && (
                    <div className="flex justify-end items-end">
                        <AppointmentForm
                            date={selectedDate}
                            time={selectedTime}
                            onClose={handleFormClose}
                            onSubmit={handleAppointmentSubmission} // Pass onSubmit prop
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentManager;
