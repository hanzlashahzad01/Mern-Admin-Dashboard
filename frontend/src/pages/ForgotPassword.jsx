import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
}).required();

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { forgotPassword } = useAuth();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await forgotPassword(data.email);
            setMessage('If an account exists with that email, a reset link has been sent.');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl dark:bg-gray-800">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Forgot Password</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Enter your email to reset your password</p>
                </div>

                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-200 rounded-lg dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="p-3 text-sm text-green-600 bg-green-100 border border-green-200 rounded-lg dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500"
                            placeholder="admin@example.com"
                        />
                        <p className="mt-1 text-xs text-red-500">{errors.email?.message}</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>

                    <div className="text-center">
                        <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
