import { useState, useEffect } from 'react';
import {
    Activity,
    Search,
    Download,
    Calendar,
    Clock,
    User,
    Info
} from 'lucide-react';
import api from '../services/api';

const ActivityLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const { data } = await api.get('/logs');
                setLogs(data);
            } catch (error) {
                console.error('Failed to fetch logs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    const filteredLogs = logs.filter(log =>
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activity Logs</h1>
                    <p className="text-gray-500 dark:text-gray-400">Track all system actions and user movements.</p>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 transition shadow-sm">
                    <Download size={18} />
                    <span>Export Logs</span>
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-96">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search logs..."
                            className="block w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-500 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                            <Calendar size={20} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-700/50">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">IP Address</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {loading ? (
                                [1, 2, 3, 4, 5].map(i => <tr key={i} className="animate-pulse"><td colSpan="5" className="px-6 py-4 h-16 bg-gray-50 dark:bg-gray-800/50"></td></tr>)
                            ) : filteredLogs.map((log) => (
                                <tr key={log._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                                                <User size={16} />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{log.userName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full ${log.action.includes('Delete') ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400' :
                                                log.action.includes('Create') ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' :
                                                    log.action.includes('Login') ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400' :
                                                        'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
                                            }`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2 max-w-xs sm:max-w-md">
                                            <Info size={14} className="text-gray-400 flex-shrink-0" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400 truncate">{log.details}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col text-xs text-gray-500">
                                            <span className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                                <Calendar size={12} /> {new Date(log.createdAt).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} /> {new Date(log.createdAt).toLocaleTimeString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-mono text-gray-500">
                                        {log.ipAddress || '127.0.0.1'}
                                    </td>
                                </tr>
                            ))}
                            {!loading && filteredLogs.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No activity found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ActivityLogs;
