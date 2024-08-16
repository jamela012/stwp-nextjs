// import { NextResponse } from 'next/server';
// import { db } from '@/app/lib/firebase';
// import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

// export async function POST(request: Request) {
//     try {
//         const { appointmentId, newDate, newTime, reason } = await request.json();

//         if (!appointmentId || !newDate || !newTime) {
//             return NextResponse.json({ message: 'Appointment ID, new date, and new time are required' }, { status: 400 });
//         }

//         // Query to find the document with the matching `id` field
//         const q = query(collection(db, 'appointments'), where('id', '==', appointmentId));
//         const querySnapshot = await getDocs(q);

//         if (querySnapshot.empty) {
//             return NextResponse.json({ message: 'No appointment found with the given ID' }, { status: 404 });
//         }

//         // Assuming there's only one document matching the query
//         const docSnap = querySnapshot.docs[0];
//         const appointmentRef = doc(db, 'appointments', docSnap.id);

//         // Update the document with new date, time, and reason for rescheduling
//         await updateDoc(appointmentRef, {
//             date: newDate,
//             time: newTime,
//             rescheduled: true,
//             reschedulingReason: reason || '', // Provide an empty string if reason is not provided
//         });

//         return NextResponse.json({ message: 'Appointment rescheduled successfully' });
//     } catch (error) {
//         console.error('Error rescheduling appointment:', error);

//         const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

//         return NextResponse.json({ message: 'Error rescheduling appointment', error: errorMessage }, { status: 500 });
//     }
// }
