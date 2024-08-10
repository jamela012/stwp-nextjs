
'use client'

import { usePathname } from "next/navigation";
export default function Footer() {
    const pathname = usePathname();

    if (pathname.startsWith("/admin")) {
        return null;
    }

    return (
        <footer className="bg-[#f8f9fa] mt-14">

            <div className="flex flex-col justify-center items-center py-10">

                <div>
                    <h4 className="text-lg font-bold text-gray-700 mb-2">
                        <a href="https://www.facebook.com/ShepherdTheWeddingPlanner" target="_blank" className="nav-link">FOLLOW US ON FACEBOOK</a>
                    </h4>
                </div>

                <div>
                    <p className="text-sm">&copy; 2023 Shepherd the Wedding Planner. All rights reserved.</p>
                </div>

            </div>

        </footer>
    );
}