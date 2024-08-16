// import { useState, useEffect } from 'react';
// import { db } from '@/app/lib/firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';

// export const useDisabledTimeSlots = (date: Date) => {
//     const [disabledTimeSlots, setDisabledTimeSlots] = useState<Set<string>>(new Set());

//     const formatTime12Hour = (hour: number) => {
//         const period = hour >= 12 ? 'PM' : 'AM';
//         const hour12 = hour % 12 || 12;
//         return `${hour12}:00 ${period}`;
//     };

//     const formatDateToFirestore = (date: Date): string => {
//         const philippineOffset = 8 * 60;
//         const localOffset = date.getTimezoneOffset();
//         const offsetDifference = philippineOffset - localOffset;

//         const localDate = new Date(date.getTime() + offsetDifference * 60 * 1000);
//         localDate.setUTCHours(0, 0, 0, 0);

//         return localDate.toISOString().split('T')[0];
//     };

//     useEffect(() => {
//         const fetchDisabledTimeSlots = async () => {
//             const dateStr = formatDateToFirestore(date);
//             const appointmentsRef = collection(db, 'appointments');
//             const q = query(appointmentsRef, where('date', '==', dateStr));
//             const querySnapshot = await getDocs(q);

            

//             const occupiedSlots: Set<string> = new Set();
//             querySnapshot.forEach(doc => {
//                 const appointment = doc.data();
//                 const timeSlot = appointment.time;
//                 occupiedSlots.add(timeSlot);
//             });

//             setDisabledTimeSlots(occupiedSlots);
//         };

//         fetchDisabledTimeSlots();
//     }, [date]);

//     return disabledTimeSlots;
// };
