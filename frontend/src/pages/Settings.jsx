import { useState } from 'react';
import {
    User,
    Lock,
    Bell,
    Globe,
    Palette,
    Camera,
    Save
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', name: 'Profile', icon: User },
        { id: 'security', name: 'Security', icon: Lock },
        { id: 'notifications', name: 'Notifications', icon: Bell },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your profile, security, and preferences.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="w-full lg:w-64 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center w-full p-4 rounded-2xl text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            <tab.icon size={18} className="mr-3" />
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* content area */}
                <div className="flex-1">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-8">
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                                    <div className="relative group">
                                        <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/40 rounded-3xl flex items-center justify-center text-blue-600 dark:text-blue-400 text-3xl font-bold">
                                            {user?.name?.charAt(0)}
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600 text-gray-500 hover:text-blue-600 transition">
                                            <Camera size={16} />
                                        </button>
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Profile Picture</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">PNG, JPG or GIF. Max 2MB.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                        <input
                                            type="text"
                                            defaultValue={user?.name}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                        <input
                                            type="email"
                                            defaultValue={user?.email}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={user?.role}
                                            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-900/50 border-none rounded-2xl text-gray-500 dark:text-gray-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Change Password</h3>
                                <div className="grid grid-cols-1 gap-6 max-w-md">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                            <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                                <Save size={20} />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
