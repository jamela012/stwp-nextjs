'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
// import LoginForm from './Loginform';

export const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // const openModal = () => setIsModalOpen(true);
    // const closeModal = () => setIsModalOpen(false);

    function getMenuClasses() {
        let menuClasses = [];

        if (isOpen) {
            menuClasses = [
                'flex',
                'absolute',
                'top-[73px]',
                'bg-orange-100',
                'bg-opacity-50',
                'backdrop-blur-sm',
                'text-black',
                'w-full',
                'p-4',
                'text-center',
                'left-0',
                'gap-10',
                'flex-col'
            ];
        } else {
            menuClasses = ['hidden', 'md:flex'];
        }

        return menuClasses.join(" ");
    }

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

    // Effect to handle scroll effect based on pathname
    useEffect(() => {
        if (pathname === "/") {
            const handleScroll = () => {
                const isScrolled = window.scrollY > 0;
                if (isScrolled !== scrolled) {
                    setScrolled(isScrolled);
                }
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        } else {
            setScrolled(false); // Ensure background color is set correctly if not on home page
        }
    }, [pathname, scrolled]);

    if (pathname.startsWith("/admin")) {
        return null;
    }

    const linkClass = (path:string) => {
        const baseClasses = `mx-2 hover:text-logo-color transition-all duration-3 ease-in-out ${pathname === path ? 'border-b-2 border-logo-color text-logo-color' : (scrolled || pathname !== '/' ? 'text-black' : 'text-white')}`;
        return baseClasses;
    };

    return (
        <nav className={`text-black p-2 sm:p-3 md:flex md:justify-between md:items-center fixed w-full z-50 ${pathname === '/' ? (scrolled ? 'bg-white text-black' : 'bg-transparent text-white') : 'bg-white text-black'}`}>
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    <Image 
                        src="/shepherd-the-wedding-planner-logo.jpg"
                        width={100}
                        height={100}
                        alt='Shepherd the Wedding Planner'
                    />
                </Link>

                <div className={`${getMenuClasses()} nav-link flex`}>
                    <Link href="/" className={linkClass('/')}>
                        Home
                    </Link>
                    <Link href="/services" className={linkClass('/services')}>
                        Services
                    </Link>
                    <Link href="/gallery" className={linkClass('/gallery')}>
                        Gallery
                    </Link>
                    <Link href="/announcements" className={linkClass('/announcements')}>
                        Announcements
                    </Link>
                    <Link href="/about-us" className={linkClass('/about-us')}>
                        About Us
                    </Link>
                    <Link href="/contact-us" className={linkClass('/contact-us')}>
                        Contact Us
                    </Link>
                    {/* <Link href="/login" className={`${linkClass('/login')} rounded-full bg-[#f85930cc] text-white text-center w-20 hover:text-white hover:bg-red-500`}>
                        Login
                    </Link> */}
                    {/* <button className="rounded-full bg-[#f85930cc] text-white text-center w-20 hover:text-white hover:bg-red-500 mx-auto" onClick={openModal}>Login</button>
                    <LoginForm isOpen={isModalOpen} onClose={closeModal} /> */}

                    
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
    );
}
