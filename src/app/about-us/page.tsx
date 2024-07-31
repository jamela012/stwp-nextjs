'use client';

import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {

    const reasons = [
        {
            num: "01",
            title: "Beautiful Setting",
            description: "Our garden is a peaceful and elegant place for your celebration."
        },
        {
            num: "02",
            title: "Different Spaces",
            description: "Whether your party is big or small, we have spaces that fit."
        },
        {
            num: "03",
            title: "Expert Help",
            description: "Our event planners are here to make things easy and fun for you."
        },
        {
            num: "04",
            title: "Unforgettable Memories",
            description: "At Shepherd Event's Garden, you'll create memories that last a lifetime."
        }
    ];

    return (
        <div>

            {/* Hero Page */}
            <div className="bg-fixed bg-cover bg-center h-svh" style={{ backgroundImage: "url('/services/services-cover.jpg')" }}>
                <div className="bg-black bg-opacity-40 h-screen flex items-center justify-center">
                    <div className="w-full sm:w-[40%] sm:pl-0 pl-10 h-56 flex justify-start items-center">
                        <h1 className="text-white sm:text-5xl text-4xl font-medium">About Us</h1>
                    </div>
                </div>
            </div>

            {/* Shepherd the Wedding Planner */}
            <div className="w-[90%] mx-auto mt-12">
                <div className="flex flex-col-reverse md:flex-row bg-orange-50">
                    <div className="text-right flex flex-1 md:justify-start justify-center overflow-hidden">
                        <Image
                            src={'/thumbnail.jpg'}
                            alt={'wedding package'}
                            width={500} 
                            height={500} 
                            className="w-[500px] h-[500px] rounded-tr-[100px]"
                        />
                    </div>
                    <div className="mt-4 p-10 flex flex-col flex-1  justify-center items-start">
                        <h1 className="text-3xl text-logo-color font-semibold mb-5">Shepherd The Wedding Planner</h1>
                        <p className="text-sm font-light w-auto mb-5">
                            Welcome to Shepherd The Wedding Planner, your premier event planning partner for crafting unforgettable experiences. With a keen eye for detail and a passion for perfection, we take pride in curating events that leave a lasting impression on you and your guests.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="w-[90%] mx-auto mt-14">
                <div className="flex flex-col md:flex-row">
                    <div className="mt-4 p-10 flex flex-col flex-1  justify-center items-start">
                        <div className="p-4">
                            <h1 className="text-5xl text-logo-color font-semibold">Why Choose</h1>
                            <h2 className="text-4xl font-medium mb-7">
                                Shepherd Event&apos;s Garden
                                <span className="text-logo-color font-bold text-4xl">?</span>
                            </h2>
                        </div>
                        <ul className="list-disc pl-6 leading-50">
                            <li className="flex items-start mb-4">
                                <svg className="w-6 h-6 text-gray-800 dark:text-logo-color mr-2 mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <div>
                                    <h3 className="text-2xl">Beautiful Garden</h3>
                                    <p>A picturesque setting filled with lush greenery.</p>
                                </div>
                            </li>
                            <li className="flex items-start mb-4">
                                <svg className="w-6 h-6 text-gray-800 dark:text-logo-color mr-2 mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <div>
                                    <h3 className="text-2xl">Colorful Flowers</h3>
                                    <p>A variety of vibrant flowers enhancing the natural beauty.</p>
                                </div>
                            </li>
                            <li className="flex items-start mb-4">
                                <svg className="w-6 h-6 text-gray-800 dark:text-logo-color mr-2 mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <div>
                                    <h3 className="text-2xl">Versatile Venue</h3>
                                    <p>Suitable for various events including weddings, birthdays, and parties.</p>
                                </div>
                            </li>
                            <li className="flex items-start mb-4">
                                <svg className="w-6 h-6 text-gray-800 dark:text-logo-color mr-2 mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <div>
                                    <h3 className="text-2xl">Enchanting Atmosphere</h3>
                                    <p>Creates a magical and memorable environment for any occasion.</p>
                                </div>
                            </li>

                        </ul>
                    </div>
                    <div className="text-right flex flex-1 md:justify-end justify-center overflow-hidden">
                        <Image
                            src={'/thumbnail.jpg'}
                            alt={'wedding package'}
                            width={600} 
                            height={600} 
                            className="w-[600px] h-[550px] rounded-tl-[100px]"
                        />
                    </div>
                </div>
            </div>

            {/* What we have */}
            <div className="w-[90%] mx-auto mt-14">
                <div className="flex flex-col md:flex-row">
                    <div className="mt-4 p-5 flex flex-col flex-1 justify-between items-center">
                        <h1 className="font-bold text-5xl text-center text-logo-color">What We Have</h1>
                        <Image
                            src={'/thumbnail.jpg'}
                            alt={'wedding package'}
                            width={500} 
                            height={500} 
                            className="w-[500px] h-[450px] rounded-t-[100px]"
                        />
                    </div>

                    <div className="flex-1 space-y-6 p-5">
                        {reasons.map((reason, index) => (
                            <div key={index} className="flex items-center mt-3 justify-center bg-orange-50">
                                <div className="flex justify-center items-center md:w-1/4 px-5">
                                    <h1 className="text-4xl font-bold text-orange-200">{reason.num}</h1>
                                </div>
                                <div className="md:w-3/4 p-5">
                                    <h3 className="text-xl font-semibold">{reason.title}</h3>
                                    <p className="mt-2">{reason.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}