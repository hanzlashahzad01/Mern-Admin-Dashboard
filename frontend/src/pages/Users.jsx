import { useState, useEffect } from 'react';
import {
    Search,
    Plus,
    MoreVertical,
    Edit,
    Trash2,
    UserPlus,
    Filter,
    CheckCircle,
    XCircle
} from 'lucide-react';
import api, { BASE_URL } from '../services/api';
import { useNotifications } from '../context/NotificationContext';

const Users = () => {
    const { addNotification } = useNotifications();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'user', password: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/users');
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (currentUser) {
                await api.put(`/users/${currentUser._id}`, formData);
                addNotification('User Updated', `User ${formData.name} has been updated successfully.`);
            } else {
                await api.post('/users', formData);
                addNotification('User Created', `New user ${formData.name} has been added to the system.`);
            }
            setIsModalOpen(false);
            fetchUsers();
            setCurrentUser(null);
            setFormData({ name: '', email: '', role: 'user', password: '' });
        } catch (error) {
            alert(error.response?.data?.message || 'Action failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/users/${id}`);
                fetchUsers();
            } catch (error) {
                alert('Delete failed');
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your team and their roles.</p>
                </div>
                <button
                    onClick={() => { setIsModalOpen(true); setCurrentUser(null); }}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                >
                    <Plus size={18} />
                    <span>Add New User</span>
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden text-gray-900 dark:text-white">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between items-center text-gray-900 dark:text-white">
                    <div className="relative w-full sm:w-96 text-gray-900 dark:text-white">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="block w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-500 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-700/50">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {loading ? (
                                [1, 2, 3].map(i => <tr key={i} className="animate-pulse"><td colSpan="5" className="px-6 py-4 h-16 bg-gray-50 dark:bg-gray-800/50"></td></tr>)
                            ) : filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold overflow-hidden">
                                                {user.profileImage ? (
                                                    <img src={`${BASE_URL}${user.profileImage}`} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    user.name.charAt(0)
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold">{user.name}</div>
                                                <div className="text-xs text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-1 text-sm">
                                            {user.status === 'active' ? (
                                                <CheckCircle size={16} className="text-green-500" />
                                            ) : (
                                                <XCircle size={16} className="text-red-500" />
                                            )}
                                            <span className="capitalize">{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => { setCurrentUser(user); setFormData({ name: user.name, email: user.email, role: user.role, password: '' }); setIsModalOpen(true); }}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Basic Edit/Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-gray-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                            {currentUser ? 'Edit User' : 'Add New User'}
                        </h2>
                        <form onSubmit={handleCreateOrUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full mt-1 px-4 py-2 border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full mt-1 px-4 py-2 border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            {!currentUser && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                    <input
                                        type="password"
                                        required
                                        className="w-full mt-1 px-4 py-2 border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                                <select
                                    className="w-full mt-1 px-4 py-2 border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white"
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="user">User</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                    <option value="superadmin">Super Admin</option>
                                </select>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition"
                                >
                                    {currentUser ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
