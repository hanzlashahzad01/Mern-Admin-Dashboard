import { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { Download, Calendar, Filter } from 'lucide-react';

const data = [
    { name: 'Monday', users: 4000, active: 2400, amt: 2400 },
    { name: 'Tuesday', users: 3000, active: 1398, amt: 2210 },
    { name: 'Wednesday', users: 2000, active: 9800, amt: 2290 },
    { name: 'Thursday', users: 2780, active: 3908, amt: 2000 },
    { name: 'Friday', users: 1890, active: 4800, amt: 2181 },
    { name: 'Saturday', users: 2390, active: 3800, amt: 2500 },
    { name: 'Sunday', users: 3490, active: 4300, amt: 2100 },
];

const Analytics = () => {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Advanced Analytics</h1>
                    <p className="text-gray-500 dark:text-gray-400">Detailed insights into system performance and user behavior.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 transition shadow-sm">
                        <Download size={18} />
                        <span className="hidden sm:inline">Download PDF</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Performance over time */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">System Traffic</h3>
                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 text-xs text-blue-600 font-bold">● Active</span>
                            <span className="flex items-center gap-1 text-xs text-indigo-400 font-bold">● Total Users</span>
                        </div>
                    </div>
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        border: 'none',
                                        borderRadius: '12px',
                                        color: '#fff'
                                    }}
                                />
                                <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                                <Area type="monotone" dataKey="active" stroke="#818cf8" strokeWidth={3} fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar Chart comparing days */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-8">User Engagement by Day</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        border: 'none',
                                        borderRadius: '12px',
                                        color: '#fff'
                                    }}
                                />
                                <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="active" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics;
