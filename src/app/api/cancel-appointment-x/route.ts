// import { NextResponse } from 'next/server';
// import { db } from '@/app/lib/firebase';
// import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

// export async function POST(request: Request) {
//     try {
//         const { appointmentId, reason } = await request.json();

//         if (!appointmentId) {
//             return NextResponse.json({ message: 'Appointment ID is required' }, { status: 400 });
//         }

//         const appointmentsRef = collection(db, 'appointments');
//         const q = query(appointmentsRef, where('id', '==', appointmentId));
//         const querySnapshot = await getDocs(q);

//         if (querySnapshot.empty) {
//             return NextResponse.json({ message: 'No document found with the provided ID' }, { status: 404 });
//         }

//         // Assume there's only one matching document
//         const docSnapshot = querySnapshot.docs[0];
//         const appointmentRef = doc(db, 'appointments', docSnapshot.id);

//         // Update the document with cancellation details
//         await updateDoc(appointmentRef, {
//             status: 'Canceled',
//             cancellationReason: reason,
//         });

//         return NextResponse.json({ message: 'Appointment cancelled successfully' });
//     } catch (error) {
//         console.error('Error canceling appointment:', error);
//         return NextResponse.json({ message: 'Error canceling appointment', error: (error as Error).message }, { status: 500 });
//     }
// }
