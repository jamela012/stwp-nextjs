import type { Metadata } from "next";
import AdminSideNav from "./components/AdminSideNav";

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
            <AdminSideNav />

            <main className="p-4 lg:ml-64 bg-slate-100 h-svh">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    {children}
                </div>
            </main>
        </>
    );
}