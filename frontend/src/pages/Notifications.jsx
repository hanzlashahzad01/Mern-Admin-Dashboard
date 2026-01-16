import { useNotifications } from '../context/NotificationContext';
import { Bell, Check, Trash2, Clock } from 'lucide-react';

const Notifications = () => {
    const { notifications, markAsRead, markAllAsRead } = useNotifications();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                    <p className="text-gray-500 dark:text-gray-400">Stay updated with system activities.</p>
                </div>
                <button
                    onClick={markAllAsRead}
                    className="text-blue-600 text-sm font-semibold hover:underline"
                >
                    Mark all as read
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {notifications.length > 0 ? (
                        notifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`p-6 transition-colors ${notif.read ? 'opacity-60' : 'bg-blue-50/30 dark:bg-blue-900/10'}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4">
                                        <div className={`p-2 rounded-xl flex-shrink-0 ${notif.read ? 'bg-gray-100 dark:bg-gray-700 text-gray-400' : 'bg-blue-100 dark:bg-blue-900/40 text-blue-600'}`}>
                                            <Bell size={20} />
                                        </div>
                                        <div>
                                            <h3 className={`text-sm font-bold ${notif.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                                                {notif.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notif.message}</p>
                                            <div className="flex items-center mt-2 text-xs text-gray-400">
                                                <Clock size={12} className="mr-1" />
                                                {notif.time}
                                            </div>
                                        </div>
                                    </div>
                                    {!notif.read && (
                                        <button
                                            onClick={() => markAsRead(notif.id)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                                            title="Mark as read"
                                        >
                                            <Check size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-gray-500">
                            No notifications yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
