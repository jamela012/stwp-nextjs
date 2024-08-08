'use client';

import Link from "next/link";
import Location from "./location";
import Form from "./form";

export default function ContactUs() {

    return (
        <div>
            {/* Hero Page */}
            <div className="bg-fixed bg-cover bg-center h-svh" style={{ backgroundImage: "url('/services/services-cover.jpg')" }}>
                <div className="bg-black bg-opacity-40 h-screen flex items-center justify-center">
                    <div className="w-full sm:w-[40%] sm:pl-0 pl-10 h-56 flex justify-start items-center">
                        <h1 className="text-white sm:text-5xl text-4xl font-medium">
                            Have Questions? 
                            <span className="block leading-loose">Let&apos;s Talk</span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* Plan Your Event with Us */}
            <div className="md:w-[80%] mx-auto mt-12">
                <div className="flex flex-col p-5">
                    <h1 className="text-4xl text-logo-color font-medium mb-5">
                        Plan Your Event with Us
                    </h1>
                    <p className="max-w-3xl text-justify leading-7 text-[#666666]">
                        Ready to take your event to the next level? Our dedicated team is here to help you plan and execute every detail flawlessly. Whether it&apos;s a corporate event, wedding, or special occasion, we&apos;re excited to make it unforgettable. Let&apos;s get started!
                    </p>
                    
                    <a 
                        href="https://www.facebook.com/ShepherdTheWeddingPlanner" 
                        className="flex items-center justify-center mt-5 w-12 h-12 bg-[#00000042] rounded-md hover:bg-[#0000005d]">
                            <svg
                                className="w-8 h-8 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                fillRule="evenodd"
                                d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                                clipRule="evenodd"
                                />
                            </svg>
                    </a>
                </div>

                <div className="flex flex-wrap mt-14 sm:p-5">
                    
                    <Form />

                    <div className="flex flex-col items-center p-5 w-full md:w-1/3 md:ml-5 mt-10 md:mt-0">
                        <div className="flex h-auto mb-10 w-full">
                            <div className="flex justify-start items-start p-2">
                                <svg
                                className="w-[48px] h-[48px] text-gray-800 dark:text-logo-color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"/>
                                </svg>
                            </div>
                            <div className="flex flex-col pt-2 pl-4">
                                <h3 className="text-3xl">Call Us</h3>
                                <p className="mt-2">402-11-81</p>
                                <p className="mt-2">+63 9162617581</p>
                            </div>
                        </div>
                        <div className="flex h-auto mb-10 w-full">
                            <div className="flex justify-start items-start p-2">
                                <svg 
                                    className="w-[48px] h-[48px] text-gray-800 dark:text-logo-color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
                                    <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
                                </svg>
                            </div>
                            <div className="flex flex-col pt-2 pl-4">
                                <h3 className="text-3xl">Email Us</h3>
                                <p className="mt-2 sm:text-base text-sm">shepherd_weddplan@yahoo.com.ph</p>
                            </div>
                        </div>

                        <div className="flex items-start w-full">
                            <Link href={'/booking'}>
                                <button className="bg-btn-color text-white font-medium p-4 text-center text-lg">
                                    Book An Appointment
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <Location />
            </div>
        </div>
    );
}