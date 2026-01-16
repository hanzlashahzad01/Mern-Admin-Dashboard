import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

const Layout = () => {
    // Open by default on desktop, closed on mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
            {/* Mobile Overlay */}
            {isSidebarOpen && window.innerWidth <= 1024 && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div
                className={`transition-all duration-300 min-h-screen flex flex-col ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
                    }`}
            >
                <Navbar toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-4 sm:p-6 pt-20 sm:pt-24">
                    <div className="max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>

                <footer className="p-6 text-center text-sm text-gray-500 border-t border-gray-100 dark:border-gray-800">
                    &copy; {new Date().getFullYear()} SmartAdmin Dashboard. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default Layout;
