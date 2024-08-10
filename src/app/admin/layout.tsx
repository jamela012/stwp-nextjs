'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Adjust the path as needed
import AdminSideNav from './components/AdminSideNav';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLoading(false);
            } else {
                router.push('authentication/admin-login'); // Redirect to login if not authenticated
            }
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <>
            <AdminSideNav />

            <main className="p-4 lg:ml-64 bg-slate-100">
                <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    {children}
                </div>
            </main>
        </>
    );
};

export default AdminLayout;
