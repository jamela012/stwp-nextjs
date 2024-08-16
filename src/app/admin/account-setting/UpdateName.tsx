'use client';

import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { app } from '../../lib/firebase';

const auth = getAuth(app);
const db = getFirestore(app);

interface UpdateNameProps {
    currentName: string;
    onSuccess: (message: string) => void;
    onError: (error: string) => void;
}

const UpdateName = ({ currentName, onSuccess, onError }: UpdateNameProps) => {
    const [displayName, setDisplayName] = useState<string>(currentName);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setDisplayName(currentName);
    }, [currentName]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const user = auth.currentUser;

        if (user) {
            try {
                if (displayName) {
                    // Update Firebase Authentication profile
                    await updateProfile(user, { displayName });

                    // Update Firestore document
                    const userDocRef = doc(db, 'users', user.uid);
                    await updateDoc(userDocRef, { displayName });

                    onSuccess('Name updated successfully!');
                }
            } catch (error) {
                console.error('Error updating name:', error);
                onError('Failed to update name.');
            } finally {
                setLoading(false);
            }
        } else {
            console.warn('No authenticated user found.');
            onError('User is not authenticated.');
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Update your name"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full md:w-auto py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? 'bg-gray-500' : 'bg-btn-color hover:bg-logo-color'} ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    {loading ? 'Updating...' : 'Update'}
                </button>
            </form>
        </div>
    );
};

export default UpdateName;
