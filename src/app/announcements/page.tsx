'use client';

import Image from "next/image";
import Link from "next/link";

export default function Announcements () {
    return (
        <div className="w-[85%] mx-auto pt-[80px]">
            <h1 className="font-semibold text-3xl pt-10">Announcements</h1>

            <div className="flex flex-col gap-5 mt-14 w-full">
                <Link href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="relative w-full h-40 md:w-48">
                        <Image
                            src={'/thumbnail.jpg'}
                            alt="stwp image"
                            width={100}
                            height={100}
                            style={{objectFit: 'cover'}}
                            className="rounded-t-lg w-full h-40 md:w-48 md:rounded-none md:rounded-l-lg"
                        />
                    </div>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    </div>
                </Link>
            </div>

        </div>
    );
}
