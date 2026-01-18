import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const { data } = await api.get('/auth/me');
                setUser(data); // data is the user object
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        setUser(data);
        return data;
    };

    const register = async (name, email, password) => {
        const { data } = await api.post('/auth/register', { name, email, password });
        localStorage.setItem('token', data.token);
        setUser(data);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const updateProfile = async (formData) => {
        // Let Axios set the boundary automatically for FormData
        const { data } = await api.put('/auth/profile', formData);
        setUser(data);
        return data;
    };

    const forgotPassword = async (email) => {
        await api.post('/auth/forgotpassword', { email });
    };

    const resetPassword = async (token, password) => {
        const { data } = await api.put(`/auth/resetpassword/${token}`, { password });
        localStorage.setItem('token', data.token);
        // After reset, we might want to fetch user data or just let them login
        // For now, let's just return the data
        return data;
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile, forgotPassword, resetPassword, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
