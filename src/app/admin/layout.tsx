import type { Metadata } from "next";
import { AdminNavbar } from "./components/AdminNavbar";

export const metadata: Metadata = {
    title: "Admin",
    description: "Shepherd the Wedding Planner Admin Page",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AdminNavbar />
            {children}
        </>
    );
}
