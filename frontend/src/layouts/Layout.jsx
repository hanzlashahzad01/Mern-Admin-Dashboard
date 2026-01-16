import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useState } from 'react';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div
                className={`transition-all duration-300 ${isSidebarOpen ? 'md:pl-64' : 'md:pl-20'
                    }`}
            >
                <Navbar />

                <main className="p-6 pt-24 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
