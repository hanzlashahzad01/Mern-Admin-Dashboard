import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    BarChart3,
    Activity,
    Bell,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { name: 'User Management', icon: Users, path: '/users', roles: ['superadmin', 'admin'] },
        { name: 'Analytics', icon: BarChart3, path: '/analytics' },
        { name: 'Activity Logs', icon: Activity, path: '/logs', roles: ['superadmin', 'admin'] },
        { name: 'Notifications', icon: Bell, path: '/notifications' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    const filteredItems = menuItems.filter(item =>
        !item.roles || item.roles.includes(user?.role)
    );

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-screen transition-all duration-300 z-50 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col",
                isOpen ? "w-64" : "w-20"
            )}
        >
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
                {isOpen && (
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        SmartAdmin
                    </span>
                )}
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                >
                    {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
                {filteredItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={cn(
                                "flex items-center w-full p-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                                isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
                            )}
                        >
                            <item.icon size={20} className={cn("min-w-[20px]", isOpen && "mr-3")} />
                            {isOpen && <span>{item.name}</span>}
                            {!isOpen && isActive && (
                                <div className="absolute left-16 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {item.name}
                                </div>
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={logout}
                    className={cn(
                        "flex items-center w-full p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 font-medium text-sm",
                        !isOpen && "justify-center"
                    )}
                >
                    <LogOut size={20} className={cn(isOpen && "mr-3")} />
                    {isOpen && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
