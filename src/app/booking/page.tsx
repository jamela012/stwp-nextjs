'use client';
import React, { useState } from 'react';
import { db } from '@/app/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useDisabledDates } from './hooks/useDisabledDates';
import AppointmentDetails from './AppointmentDetails';
import AppointmentCalendarSection from './AppointmentCalendarSection';
import AppointmentFormSection from './AppointmentFormSection';
import TimeSlot from './TimeSlot';
import { formatDateToFirestore } from './utils/dateUtils';
import { v4 as uuidv4 } from 'uuid';

const AppointmentManager = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [appointmentId, setAppointmentId] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const disabledDates = useDisabledDates();

    const handleDateClick = (date: Date | null) => {
        if (date) {
            const dateStr = formatDateToFirestore(date);
            if (disabledDates.has(dateStr)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fully Booked',
                    text: 'This date is fully booked.',
                });
                setSelectedDate(null);
                setSelectedTime(null);
                setShowForm(false);
            } else {
                setSelectedDate(date);
                setSelectedTime(null);
                setShowForm(false);
            }
        } else {
            setSelectedDate(null);
            setSelectedTime(null);
            setShowForm(false);
        }
    };

    const handleTimeSlotSelection = (timeSlot: string) => {
        if (selectedDate) {
            const generatedId = uuidv4();
            setSelectedTime(timeSlot);
            setAppointmentId(generatedId);
            setShowForm(true);
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setSelectedTime(null);
    };

    const handleAppointmentSubmission = async (formData: any): Promise<void> => {
        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // Abort after 10 seconds
        const retryAttempts = 3; // Number of times to retry sending email
        let emailSent = false;

        try {
            // Save the appointment to Firestore
            await addDoc(collection(db, 'appointments'), {
                id: formData.id,
                status: 'Scheduled',
                date: formatDateToFirestore(new Date(formData.date)),
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
                createdAt: formData.createdAt,
            });

            // Attempt to send the email with retries
            for (let attempt = 0; attempt < retryAttempts; attempt++) {
                try {
                    const emailResponse = await fetch('/api/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...formData,
                            date: formatDateToFirestore(new Date(formData.date)),
                            time: formData.time,
                            appointmentId: formData.id,
                        }),
                        signal: controller.signal,
                    });

                    if (emailResponse.ok) {
                        emailSent = true;
                        break; // Exit retry loop if email is successfully sent
                    } else {
                        throw new Error('Failed to send email');
                    }
                } catch (error) {
                    if (attempt === retryAttempts - 1) {
                        throw error; // Throw error after final retry
                    }
                }
            }

            // Display SweetAlert with user action for reload
            if (emailSent) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Appointment booked successfully! A confirmation email has been sent.',
                    confirmButtonText: 'Ok',
                    didClose: () => {
                        window.location.reload(); // Reload the page when the user clicks the button
                    },
                });
            } else {
                await Swal.fire({
                    icon: 'warning',
                    title: 'Appointment Booked',
                    text: 'The appointment was successfully booked, but we failed to send the confirmation email. Please contact support.',
                    confirmButtonText: 'Ok',
                    didClose: () => {
                        window.location.reload(); // Reload the page when the user clicks the button
                    },
                });
            }
    
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Submission Failed',
                        text: 'The request timed out. Please try again later.',
                        showConfirmButton: true,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Submission Failed',
                        text: 'Failed to book appointment. Please check your internet connection and try again later.',
                        showConfirmButton: true,
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: 'An unknown error occurred. Please try again later.',
                    showConfirmButton: true,
                });
            }
        } finally {
            clearTimeout(timeoutId);
            setLoading(false);
        }
    };

    return (
        <div className="relative top-20 p-4 md:p-6 lg:p-8">
            {loading && (
                <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="loader"></div>
                    <p className="text-white text-lg">Submitting...</p>
                </div>
            )}

            <div className='mb-32'>
                <div className='flex md:w-[80%] mx-auto flex-wrap md:flex-row flex-col'>
                    <div className='flex flex-1 justify-center items-center'>
                        <AppointmentDetails
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                        />
                    </div>
                    <div className='flex-1'>
                        <AppointmentCalendarSection
                            selectedDate={selectedDate}
                            disabledDates={disabledDates}
                            onDateClick={handleDateClick}
                            disabled={loading}
                        />
                    </div>
                    {selectedDate && !disabledDates.has(formatDateToFirestore(selectedDate)) && (
                        <div className='flex-1'>
                            <TimeSlot
                                date={selectedDate}
                                onTimeSlotSelection={handleTimeSlotSelection}
                                disabled={loading}
                            />
                        </div>
                    )}
                </div>
                {showForm && selectedDate && selectedTime && (
                    <AppointmentFormSection
                        date={selectedDate}
                        time={selectedTime}
                        appointmentId={appointmentId}
                        onClose={handleFormClose}
                        onSubmit={handleAppointmentSubmission}
                        disabled={loading}
                    />
                )}
            </div>
        </div>
    );
};

export default AppointmentManager;
