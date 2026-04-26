import React from 'react';
import Sidebar from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
    return (
        <div className="dark flex min-h-screen bg-background font-sans relative overflow-hidden text-white selection:bg-primary/30">
            <Sidebar />

            <main className="flex-1 w-full md:ml-[280px] p-4 md:p-6 z-10 flex flex-col h-screen overflow-y-auto overflow-x-hidden">
                {/* Outlet replaces the Next.js {children} prop */}
                <Outlet />
            </main>
        </div>
    );
}