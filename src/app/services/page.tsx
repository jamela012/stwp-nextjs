'use client';

import Image from "next/image";
import Link from "next/link";

export default function Services() {
    return (
        <div>
            {/* Hero Page */}
            <div className="bg-fixed bg-cover bg-center h-svh" style={{ backgroundImage: "url('/services/services-cover.jpg')" }}>
                <div className="bg-black bg-opacity-40 h-screen flex items-center justify-center">
                    <div className="w-full sm:w-[40%] sm:pl-0 pl-10 h-56 flex justify-start items-center">
                        <h1 className="text-white sm:text-6xl text-4xl font-medium">Our Services</h1>
                    </div>
                </div>
            </div>

            {/* List of Services */}
            <div className="w-[80%] mx-auto mt-14">
                <div className="flex flex-col md:flex-row ">
                    <div className="flex flex-1 justify-center items-center">
                        <h1 className="px-5 text-4xl font-medium leading-normal">Celebrate in Style: Elevate <span className="lg:block"> Your Event with Our Services <span className="lg:block">Offered</span></span></h1>
                    </div>
                    <div className="flex flex-1 justify-center items-center">
                        <ul className="p-10 text-xl font-light list-disc leading-relaxed">
                            <li>Men Suits, Bridal & Evening Gowns</li>
                            <li>Wedding Banquet & Reception</li>
                            <li>Photo & Video Coverage</li>
                            <li>Floral Arrangement for Church and Entourage</li>
                            <li>Lights & Sounds System</li>
                            <li>SDE Service, LCD Projector & LED Wall Rental</li>
                            <li>Photobooth & Balloons Decoration</li>
                            <li>Invites & Souvenirs Items</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* wedding package */}
            <div className="md:w-[75%] w-[80%] mx-auto mt-14">
                <div className="flex flex-col md:flex-row bg-orange-50">
                    <div className="mt-4 p-10 flex flex-col flex-1  justify-center items-start">
                        <h1 className="text-3xl text-logo-color font-semibold">Wedding</h1>
                        <h2 className="text-base font-medium mb-5">Packages</h2>
                        <p className="text-md font-light w-auto mb-5">
                            Indulge in a wedding celebration like no other with our different all-inclusive packages. From stylish attire to enchanting decorations, lights, and sounds, we have got every detail covered. Elevate your special day with top-notch photo and video services, immersive visuals, and delightful decorations.
                        </p>
                        <Link href={'/contact-us'}>
                            <button className="flex font-light">
                                <p className="italic mr-2">Inquire Now</p>
                                <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                                </svg>
                            </button>
                        </Link>
                    </div>
                    <div className="text-right flex flex-1 md:justify-end justify-center overflow-hidden">
                        <Image
                            src={'/services/photos.jpg'}
                            alt={'wedding'}
                            width={450} 
                            height={550} 
                            quality={100}
                            className="w-[450px] h-[550px] rounded-tl-[100px]"
                        />
                    </div>
                </div>
            </div>

            {/* Social Celebrations */}
            <div className="w-[80%] mx-auto mt-12">
                <div className="flex flex-col-reverse md:flex-row">
                    <div className="text-right flex flex-1 md:justify-start justify-center overflow-hidden md:pl-10">
                        <Image
                            src={'/home/social.jpg'}
                            alt={'social celebration'}
                            width={450} 
                            height={550} 
                            className="w-[450px] h-[550px] rounded-tr-[100px]"
                        />
                    </div>
                    <div className="mt-4 p-10 flex flex-col flex-1  justify-center items-start">
                        <h1 className="text-3xl text-logo-color font-semibold">Social Celebrations</h1>
                        <h2 className="text-base font-medium mb-5">Packages</h2>
                        <p className="text-md font-light w-auto mb-5">
                            Elevate your social events to new heights with our different packages for Social Celebrations. From Men Suits to Bridal & Evening Gowns, we offer a range of services tailored to make your celebration extraordinary.
                        </p>
                        <Link href={'/contact-us'}>
                            <button className="flex font-light">
                                <p className="italic mr-2">Inquire Now</p>
                                <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stwp Event Garden */}
            <div className="w-[80%] mx-auto mt-12">
                <div className="flex flex-col md:flex-row bg-orange-50">
                    <div className="mt-4 p-10 flex flex-col flex-1  justify-center items-start">
                        <h1 className="text-3xl text-logo-color font-semibold">Shepherd Event&apos;s Garden</h1>
                        <h2 className="text-base font-medium mb-5">Event Studio</h2>
                        <p className="text-md font-light w-auto mb-5">
                            Enjoy your outdoor celebrations at Shepherd Event&apos;s Garden. Immerse yourself in a beautiful and natural elegance of our event studio. Whether it is a wedding, social gathering, or corporate event, our picturesque venue provides the perfect backdrop for unforgettable moments. Let Shepherd Event&apos;s Garden be the canvas for your special occasions.
                        </p>
                        <Link href={'/gallery'}>
                            <button className="flex font-light">
                                <p className="italic mr-2">Gallery</p>
                                <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                                </svg>
                            </button>
                        </Link>
                    </div>
                    <div className="text-right flex flex-1 md:justify-end justify-center overflow-hidden">
                        <Image
                            src={'/services/event.jpg'}
                            alt={'wedding package'}
                            width={450} 
                            height={550} 
                            className="w-[450px] h-[550px] rounded-tl-[100px]"
                        />
                    </div>
                </div>
            </div>


        </div>
        
    );
}
