'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    function getMenuClasses() {
        let menuClasses = [];

        if(isOpen) {
            menuClasses = [
                'flex',
                'absolute',
                'top-[80px]',
                'bg-white',
                'text-black',
                'w-full',
                'p-4',
                'text-center',
                'left-0',
                'gap-10',
                'flex-col'
            ]
        } else {
            menuClasses = ['hidden', 'md:flex'];
        }

        return menuClasses.join(" ");
    };

    // Effect to handle window resize and close the menu on larger screens
    useEffect(() => {
        const handleResize = () => {
        if (window.innerWidth >= 768) {
            setIsOpen(false);
        }
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    if (pathname.startsWith("/admin")) {
        return null;
    }

    return (
        <nav className='bg-white text-black p-4 sm:p-6 md:justify-between md:items-center'>
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    <Image 
                        src="/shepherd-the-wedding-planner-logo.jpg"
                        width={100}
                        height={100}
                        alt='Shepherd the Wedding Planner'
                    />
                </Link>
                <div className={getMenuClasses()}>
                    <Link href="/" className='mx-2 hover:text-gray-300'>
                        Home
                    </Link>
                    <Link href="/services" className='mx-2 hover:text-gray-300'>
                        Services
                    </Link>
                    <Link href="/announcements" className='mx-2 hover:text-gray-300'>
                        Announcements
                    </Link>
                    <Link href="/about-us" className='mx-2 hover:text-gray-300'>
                        About Us
                    </Link>
                    <Link href="/contact-us" className='mx-2 hover:text-gray-300'>
                        Contact Us
                    </Link>
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                        className="relative group flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all"
                    >
                        <div className={`flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden ${isOpen ? 'open' : ''}`}>
                            <div className={`bg-black h-[2px] w-7 transform transition-all duration-300 origin-left ${isOpen ? 'rotate-[42deg]' : ''}`}></div>
                            <div className={`bg-black h-[2px] w-1/2 rounded transform transition-all duration-300 ${isOpen ? '-translate-x-10 opacity-0' : ''}`}></div>
                            <div className={`bg-black h-[2px] w-7 transform transition-all duration-300 origin-left ${isOpen ? '-rotate-[42deg]' : ''}`}></div>
                        </div>
                    </button> 
                </div>

            </div>
        </nav>
    )
}


