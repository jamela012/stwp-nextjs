
'use client'

import { usePathname } from "next/navigation";
export default function Footer() {
    const pathname = usePathname();

    if (pathname.startsWith("/admin")) {
        return null;
    }

    return (
        <footer>
            <h1>FOOTER</h1>
        </footer>
    );
}