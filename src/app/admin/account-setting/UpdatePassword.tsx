'use client';

import { useState } from 'react';
import { getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';
import { app } from '../../lib/firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const auth = getAuth(app);

interface UpdatePasswordProps {
    onSuccess: (message: string) => void;
    onError: (error: string) => void;
}

const UpdatePassword = ({ onSuccess, onError }: UpdatePasswordProps) => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const user = auth.currentUser;

        if (user) {
            try {
                // Re-authenticate user with the current password
                const credential = EmailAuthProvider.credential(user.email || '', currentPassword);
                await reauthenticateWithCredential(user, credential);

                // Update password
                if (newPassword) {
                    await updatePassword(user, newPassword);
                    onSuccess('Password updated successfully!');
                }
            } catch (error) {
                onError('Failed to update password.');
            } finally {
                setLoading(false);
            }
        } else {
            onError('User is not authenticated.');
            setLoading(false);
        }
    };

    return (
        <div className="space-y-2 border shadow-sm bg-gray-50 mt-8 p-5 rounded-sm">
            <h2 className="text-xl font-semibold">Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your current password"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="relative">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter a new password"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium ${loading ? 'bg-gray-500' : 'bg-btn-color hover:bg-logo-color'}`}
                >
                    {loading ? 'Updating...' : 'Update Password'}
                </button>
            </form>
        </div>
    );
};

export default UpdatePassword;
    