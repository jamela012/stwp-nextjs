'use client';

import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../lib/firebase';
import UpdateName from './UpdateName';
import UpdateUsername from './UpdateUsername';
import UpdatePassword from './UpdatePassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth(app);
const db = getFirestore(app);

export default function Account() {
    const [displayName, setDisplayName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setDisplayName(user.displayName || '');
            setEmail(user.email || '');

            const fetchUsername = async () => {
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUsername(userData?.username || '');
                    }
                } catch (err) {
                    console.error('Failed to fetch username:', err);
                    toast.error('Failed to fetch username.');
                }
            };

            fetchUsername();
        }
    }, []);

    const handleSuccess = (message: string) => {
        toast.success(message);
    };

    const handleError = (error: string) => {
        toast.error(error);
    };

    return (
        <div className="p-5">
            <h1 className="text-4xl font-semibold mb-10 text-center sm:text-left">Account Setting</h1>

            <div className='max-w-3xl mx-auto md:ml-7'>
                <UpdateName currentName={displayName} onSuccess={handleSuccess} onError={handleError} />

                <div className="my-8 bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-700">Email Address</h2>
                    <p className="text-gray-600 break-words">Current Email: <span className="font-medium">{email}</span></p>
                    <p className="text-sm text-gray-500 mt-1">The email address cannot be edited directly here. Please use the appropriate settings to update it.</p>
                </div>

                <UpdateUsername currentUsername={username} onSuccess={handleSuccess} onError={handleError} />

                <UpdatePassword onSuccess={handleSuccess} onError={handleError} />
            </div>

            <ToastContainer />
        </div>
    );
}
