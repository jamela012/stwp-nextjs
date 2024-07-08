'use client';
import Image from 'next/image';
import Link from 'next/link';

export const AdminNavbar = () => {

    return (
        <nav className='bg-white text-black p-4 sm:p-6 md:justify-between md:items-center'>
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/admin" className="text-2xl font-bold">
                    <Image 
                        src="/shepherd-the-wedding-planner-logo.jpg"
                        width={100}
                        height={100}
                        alt='Shepherd the Wedding Planner'
                    />
                </Link>
                <div>
                    <Link href="/admin" className='mx-2 hover:text-gray-300'>
                        Dashboard
                    </Link>
                    <Link href="/admin/services" className='mx-2 hover:text-gray-300'>
                        Services
                    </Link>
                    <Link href="/admin/announcements" className='mx-2 hover:text-gray-300'>
                        Announcements
                    </Link>
                    <Link href="/admin/appointments" className='mx-2 hover:text-gray-300'>
                        Appointments
                    </Link>
                    <Link href="/admin/inquiries" className='mx-2 hover:text-gray-300'>
                        Inquiries
                    </Link>
                    <Link href="/admin/staffs" className='mx-2 hover:text-gray-300'>
                        Staffs
                    </Link>
                </div>

            </div>
        </nav>
    )
}


