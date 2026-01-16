import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { logout, user } = useAuth();

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
            {/* Sidebar Placeholder */}
            <aside className="hidden w-64 overflow-y-auto border-r border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 md:block">
                <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-xl font-bold text-blue-600">Admin</span>
                </div>
                <nav className="p-4 space-y-2">
                    <a href="/" className="block px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-white">Dashboard</a>
                    <button onClick={logout} className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg dark:hover:bg-red-900/20">Logout</button>
                </nav>
            </aside>

            <div className="flex flex-col flex-1 w-0 overflow-hidden">
                {/* Navbar Placeholder */}
                <header className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Overview</h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name}</span>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
