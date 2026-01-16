import { Bell, Search, Sun, Moon, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user } = useAuth();
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { unreadCount } = useNotifications();
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 right-0 left-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 h-16 transition-all duration-300">
            <div className="flex items-center justify-between h-full px-6 ml-auto">
                <div className="relative flex-1 max-w-md ml-64 lg:ml-72 hidden md:block">
                    {/* Placeholder for future sidebar-aware margin */}
                </div>

                <div className="flex items-center space-x-4 ml-auto">
                    <div className="relative hidden sm:block">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            className="block w-64 pl-10 pr-4 py-2 text-sm text-gray-900 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Search anything..."
                        />
                    </div>

                    <button
                        onClick={toggleDarkMode}
                        className="p-2 text-gray-500 rounded-xl hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button
                        onClick={() => navigate('/notifications')}
                        className="relative p-2 text-gray-500 rounded-xl hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-800">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

                    <div className="relative">
                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className="flex items-center space-x-3 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="flex flex-col items-end hidden sm:flex">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</span>
                            </div>
                            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                                {user?.name?.charAt(0)}
                            </div>
                        </button>

                        {showProfile && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                    <User size={16} className="mr-2" /> Profile Settings
                                </button>
                                <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                                <button
                                    onClick={() => {/* logout handled in sidebar but can be here too */ }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
