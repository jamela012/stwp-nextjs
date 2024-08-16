// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { db } from '@/app/lib/firebase'; // Adjust the import based on your file structure
// import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
// import AppointmentCalendarSection from '../booking/AppointmentCalendarSection'; // Adjust the import path if necessary
// import TimeSlot from '../booking/TimeSlot'; // Adjust the import path if necessary
// import Swal from 'sweetalert2';

// const RescheduleAppointment = () => {
//     const [appointmentId, setAppointmentId] = useState<string>('');
//     const [newDate, setNewDate] = useState<Date | null>(null);
//     const [newTime, setNewTime] = useState<string | null>(null);
//     const [disabledDates, setDisabledDates] = useState<Set<string>>(new Set());
//     const [appointmentDocId, setAppointmentDocId] = useState<string | null>(null);
//     const [disabled, setDisabled] = useState(false); // To manage disabled state
//     const router = useRouter();

//     useEffect(() => {
//         // Extract appointment ID from URL parameters
//         const params = new URLSearchParams(window.location.search);
//         const id = params.get('appointmentId');
//         if (id) {
//             setAppointmentId(id);
//             fetchAppointment(id);
//         }

//         // Fetch disabled dates from Firestore or other source if necessary
//         // Example: setDisabledDates(new Set(['2024-08-10', '2024-08-11']));
//     }, []);

//     const fetchAppointment = async (id: string) => {
//         try {
//             // Query to find the document with the given appointmentId
//             const q = query(collection(db, 'appointments'), where('id', '==', id));
//             const querySnapshot = await getDocs(q);
    
//             if (!querySnapshot.empty) {
//                 const docSnap = querySnapshot.docs[0];
//                 setAppointmentDocId(docSnap.id);
    
//                 const appointmentData = docSnap.data();
//                 const currentDate = appointmentData.date;
    
//                 if (currentDate) {
//                     const dateQuery = query(collection(db, 'appointments'), where('date', '==', currentDate));
//                     const dateSnapshot = await getDocs(dateQuery);
    
//                     const datesSet = new Set<string>();
//                     dateSnapshot.forEach(doc => {
//                         const data = doc.data();
//                         const date = data.date;
//                         if (date) {
//                             datesSet.add(date);
//                         }
//                     });
    
//                     console.log('Disabled Dates:', datesSet); // Log disabled dates
//                     setDisabledDates(datesSet);
//                 }
//             } else {
//                 console.error('No matching appointment found!');
//             }
//         } catch (error) {
//             console.error('Error fetching appointment:', error);
//         }
//     };
    

//     const handleDateClick = (date: Date | null) => {
//         setNewDate(date);
//     };

//     const handleTimeSlotClick = (timeSlot: string) => {
//         setNewTime(timeSlot);
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!appointmentDocId || !newDate || !newTime) {
//             Swal.fire({
//                 title: 'Warning!',
//                 text: 'Please select a new date and time.',
//                 icon: 'warning',
//                 confirmButtonText: 'OK'
//             });
//             return;
//         }

//         try {
//             // Format the date to YYYY-MM-DD
//             const formattedDate = newDate.toISOString().split('T')[0];

//             // Reference to the appointment document using the document ID
//             const appointmentRef = doc(db, 'appointments', appointmentDocId);

//             // Update the appointment with the new date and time
//             await updateDoc(appointmentRef, {
//                 date: formattedDate, // Store the date in YYYY-MM-DD format
//                 time: newTime,
//                 status: 'Rescheduled',
//             });

//             // Use SweetAlert for user feedback
//             Swal.fire({
//                 title: 'Success!',
//                 text: 'Your appointment has been rescheduled.',
//                 icon: 'success',
//                 confirmButtonText: 'OK'
//             }).then(() => {
//                 router.push('/');
//             });
//         } catch (error) {
//             console.error('Error rescheduling appointment:', error);

//             // Use SweetAlert for error feedback
//             Swal.fire({
//                 title: 'Error!',
//                 text: 'Failed to reschedule the appointment. Please try again later.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//         }
//     };

//     return (
//         <div className="p-4 min-h-screen flex flex-col justify-center items-center bg-gray-100">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//                 <h1 className="text-2xl font-semibold mb-4">Reschedule Appointment</h1>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <input
//                         type="text"
//                         placeholder="Appointment ID"
//                         value={appointmentId}
//                         readOnly
//                         className="p-2 border rounded w-full bg-gray-200 cursor-not-allowed"
//                     />
//                     <div>
//                         <h2 className="text-lg font-semibold mb-2">Select New Date</h2>
//                         <AppointmentCalendarSection
//                             selectedDate={newDate}
//                             onDateClick={handleDateClick}
//                             disabledDates={disabledDates}
//                             disabled={disabled} // Pass the disabled state
//                         />
//                     </div>
//                     {newDate && (
//                         <div>
//                             <h2 className="text-lg font-semibold mb-2">Select New Time</h2>
//                             <TimeSlot
//                                 date={newDate}
//                                 onTimeSlotSelection={handleTimeSlotClick} // Pass the time slot click handler
//                                 disabled={disabled} // Pass the disabled state
//                             />
//                         </div>
//                     )}
//                     <button
//                         type="submit"
//                         className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                     >
//                         Reschedule Appointment
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default RescheduleAppointment;
