'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { auth } from '../../lib/firebase'; // Adjust the import path
import { useRouter } from 'next/navigation';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore();

const AdminLogin = () => {
    const [loginInput, setLoginInput] = useState(''); // Input for email or username
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let email = '';

            // Check if loginInput is an email or username
            if (loginInput.includes('@')) {
                // It's an email
                email = loginInput;
            } else {
                // It's a username, query Firestore for the email
                const usersCollection = collection(db, 'users');
                const q = query(usersCollection, where('username', '==', loginInput));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const userData = userDoc.data();
                    email = userData?.email;

                    if (!email) {
                        setError('No email associated with this username.');
                        setLoading(false);
                        return;
                    }
                } else {
                    setError('Username does not exist.');
                    setLoading(false);
                    return;
                }
            }

            // Sign in with the email found
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/admin/dashboard'); // Redirect to admin dashboard or another protected page

        } catch (err) {
            const error = err as AuthError; // Type assertion
            switch (error.code) {
                case 'auth/invalid-email':
                    setError('Invalid email address.');
                    break;
                case 'auth/user-not-found':
                    setError('No user found with this email.');
                    break;
                case 'auth/wrong-password':
                    setError('Incorrect password.');
                    break;
                default:
                    setError('Failed to login. Please check your credentials.');
                    break;
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold text-center">Admin Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="loginInput" className="block text-sm font-medium text-gray-700">Email or Username</label>
                        <input
                            type="text"
                            id="loginInput"
                            value={loginInput}
                            onChange={(e) => setLoginInput(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
