import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Welcome, {user?.name}</p>

            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
                {/* Placeholder Stats */}
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</h3>
                    <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">1,234</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Sessions</h3>
                    <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">56</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
                    <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">$12,345</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
