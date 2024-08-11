import { getFirestore, query, where, getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import { Appointment } from './type'; // Adjust import based on your structure

const db = getFirestore();

export const updateAppointmentByIdField = async (idField: string, updatedData: Partial<Appointment>) => {
    try {
        // Query to find the document with the given id field
        const q = query(collection(db, 'appointments'), where('id', '==', idField));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error('No document found with the provided id field');
        }

        // Assuming there's only one document with the given id field
        const docRef = doc(db, 'appointments', querySnapshot.docs[0].id);
        
        await updateDoc(docRef, updatedData);
        console.log('Document successfully updated');
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error; // Re-throw error for handling in component
    }
};
