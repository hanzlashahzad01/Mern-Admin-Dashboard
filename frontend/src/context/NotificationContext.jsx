import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New User Registered', message: 'John Doe has just joined the platform.', time: '2 mins ago', read: false },
        { id: 2, title: 'Server Alert', message: 'CPU usage is above 80%.', time: '10 mins ago', read: false },
        { id: 3, title: 'Update Successful', message: 'System updated to version 2.4.0.', time: '1 hour ago', read: true },
    ]);

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{ notifications, markAsRead, markAllAsRead, unreadCount }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
