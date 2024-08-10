'use client';
import { useEffect, useState } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp, getDocs, where, query } from 'firebase/firestore';
import AppointmentModal from './AppointmentModal';
import ViewAppointmentModal from './ViewAppointmentModal';
import AppointmentTable from './AppointmentTable';
import { Appointment } from './type';
import { onSnapshot } from 'firebase/firestore';
import Swal from 'sweetalert2';


export default function AdminAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'appointments'), (querySnapshot) => {
            const fetchedAppointments: Appointment[] = [];
            querySnapshot.forEach((doc) => {
                fetchedAppointments.push({ id: doc.id, ...doc.data() } as Appointment);
            });
            setAppointments(fetchedAppointments);
            setLoading(false);
        }, (error) => {
            setError('Failed to fetch appointments');
            console.error(error);
            setLoading(false);
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, []);

    const openEditModal = (appointment: Appointment | null = null) => {
        setSelectedAppointment(appointment);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedAppointment(null);
    };

    const openViewModal = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setIsViewModalOpen(true);
    };

    const closeViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedAppointment(null);
    };

    const handleSave = async (appointmentData: Partial<Appointment>) => {
        try {
            if (selectedAppointment) {
                const appointmentRef = doc(db, 'appointments', selectedAppointment.id);
                await updateDoc(appointmentRef, appointmentData);
            } else {
                const newAppointmentRef = await addDoc(collection(db, 'appointments'), {
                    ...appointmentData,
                    createdAt: Timestamp.now(),
                    id: '' // Ensure 'id' field is initialized or update later
                });
                // Optionally, update the new document with its generated ID
                await updateDoc(newAppointmentRef, { id: newAppointmentRef.id });
            }
            // No need to call fetchAppointments since onSnapshot will handle updates
            closeEditModal();
        } catch (err) {
            console.error('Error saving appointment:', err);
        }
    };

    const handleDelete = async (appointmentId: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
    
        if (result.isConfirmed) {
            try {
                // Query to find the document with the matching `id`
                const q = query(collection(db, 'appointments'), where('id', '==', appointmentId));
                const querySnapshot = await getDocs(q);
    
                if (!querySnapshot.empty) {
                    // Assuming there's only one document with the matching `id`
                    const docToDelete = querySnapshot.docs[0];
                    await deleteDoc(doc(db, 'appointments', docToDelete.id));
                    Swal.fire('Deleted!', 'The appointment has been deleted.', 'success');
                } else {
                    Swal.fire('Error!', 'Appointment not found.', 'error');
                }
            } catch (err) {
                Swal.fire('Error!', 'There was an issue deleting the appointment.', 'error');
            }
        }
    };
    
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Appointments</h1>
                {/* <button
                    onClick={() => openEditModal()}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Create Appointment
                </button> */}
            </div>
            <AppointmentTable
                appointments={appointments}
                onView={openViewModal}
                onEdit={openEditModal}
                onDelete={handleDelete}
                loading={loading}
                error={error}
            />
            {isEditModalOpen && (
                <AppointmentModal
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    onSave={handleSave}
                    title={selectedAppointment ? 'Edit Appointment' : 'Create Appointment'}
                    appointmentData={selectedAppointment || undefined} // Handle null by passing undefined
                />
            )}
            {isViewModalOpen && selectedAppointment && (
                <ViewAppointmentModal
                    isOpen={isViewModalOpen}
                    onClose={closeViewModal}
                    appointmentData={selectedAppointment}
                />
            )}
        </div>
    );
}
