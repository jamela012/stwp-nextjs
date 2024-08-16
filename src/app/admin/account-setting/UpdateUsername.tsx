'use client';

import { useState, useEffect } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../../lib/firebase';

const auth = getAuth(app);
const db = getFirestore(app);

interface UpdateUsernameProps {
    currentUsername: string;
    onSuccess: (message: string) => void;
    onError: (error: string) => void;
}

const UpdateUsername = ({ currentUsername, onSuccess, onError }: UpdateUsernameProps) => {
    const [username, setUsername] = useState<string>(currentUsername);
    const [loading, setLoading] = useState<boolean>(false);

    // Update username when currentUsername prop changes
    useEffect(() => {
        setUsername(currentUsername);
    }, [currentUsername]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const user = auth.currentUser;

        if (user) {
            try {
                const userDocRef = doc(db, 'users', user.uid);
                await updateDoc(userDocRef, { username });
                onSuccess('Username updated successfully!');
            } catch (error) {
                onError('Failed to update username.');
            } finally {
                setLoading(false);
            }
        } else {
            onError('User is not authenticated.');
            setLoading(false);
        }
    };

    return (
        <div className="space-y-2">
            <div className="text-sm text-gray-700">
                Current Username: <span className="font-medium">{currentUsername}</span>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Update your username"
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

export default UpdateUsername;
