import { useState, useRef, useEffect } from 'react';
import {
    User,
    Lock,
    Bell,
    Camera,
    Save,
    CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BASE_URL } from '../services/api';

const Settings = () => {
    const { user, updateProfile } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Profile State
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    // Sync profile data if user state updates
    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name,
                email: user.email
            });
            if (user.profileImage) {
                setImagePreview(`${BASE_URL}${user.profileImage}`);
            }
        }
    }, [user]);

    const [imagePreview, setImagePreview] = useState(user?.profileImage ? `${BASE_URL}${user.profileImage}` : null);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    // Security State
    const [securityData, setSecurityData] = useState({
        password: '',
        confirmPassword: '',
    });

    const tabs = [
        { id: 'profile', name: 'Profile', icon: User },
        { id: 'security', name: 'Security', icon: Lock },
        { id: 'notifications', name: 'Notifications', icon: Bell },
    ];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleProfileSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const formData = new FormData();
            formData.append('name', profileData.name);
            formData.append('email', profileData.email);
            if (selectedImage) {
                formData.append('profileImage', selectedImage);
            }

            await updateProfile(formData);
            setSuccess('Profile updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error('Update Profile Error Details:', err);
            setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSecuritySave = async (e) => {
        e.preventDefault();
        if (securityData.password !== securityData.confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const formData = new FormData();
            formData.append('password', securityData.password);
            await updateProfile(formData);
            setSuccess('Password updated successfully!');
            setSecurityData({ password: '', confirmPassword: '' });
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your profile, security, and preferences.</p>
                </div>
            </div>

            {success && (
                <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-2xl border border-green-100 dark:border-green-800 animate-in fade-in duration-300">
                    <CheckCircle2 size={18} className="mr-2" />
                    {success}
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-800">
                    {error}
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Tabs - Mobile Responsive */}
                <div className="w-full lg:w-64 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center whitespace-nowrap lg:w-full p-4 rounded-2xl text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm'
                                }`}
                        >
                            <tab.icon size={18} className="mr-3" />
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 sm:p-8">
                        {activeTab === 'profile' && (
                            <form onSubmit={handleProfileSave} className="space-y-6">
                                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                                    <div className="relative group">
                                        <div className="w-28 h-28 bg-blue-100 dark:bg-blue-900/40 rounded-3xl flex items-center justify-center text-blue-600 dark:text-blue-400 text-3xl font-bold overflow-hidden shadow-inner">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                user?.name?.charAt(0)
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current.click()}
                                            className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600 text-gray-500 hover:text-blue-600 transition hover:scale-110 active:scale-95"
                                        >
                                            <Camera size={18} />
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Profile Picture</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 uppercase font-semibold">PNG, JPG or GIF. Max 2MB.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={profileData.name}
                                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                            className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                            className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 disabled:opacity-50"
                                    >
                                        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" /> : <Save size={20} />}
                                        <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                                    </button>
                                </div>
                            </form>
                        )}

                        {activeTab === 'security' && (
                            <form onSubmit={handleSecuritySave} className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Security Settings</h3>
                                <div className="space-y-6 max-w-md">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">New Password</label>
                                        <input
                                            type="password"
                                            value={securityData.password}
                                            onChange={(e) => setSecurityData({ ...securityData, password: e.target.value })}
                                            className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={securityData.confirmPassword}
                                            onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                                            className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 disabled:opacity-50"
                                    >
                                        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" /> : <Save size={20} />}
                                        <span>{loading ? 'Update Password' : 'Update Password'}</span>
                                    </button>
                                </div>
                            </form>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                                <Bell size={48} className="mx-auto mb-4 opacity-20" />
                                <p>Notification preferences coming soon.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
