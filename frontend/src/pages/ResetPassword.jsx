import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const schema = yup.object({
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
}).required();

const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { resetPassword } = useAuth();
    const { token } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');
        try {
            await resetPassword(token, data.password);
            navigate('/login', { state: { message: 'Password reset successful! Please login with your new password.' } });
        } catch (err) {
            setError(err.response?.data?.message || 'Token is invalid or has expired');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl dark:bg-gray-800">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reset Password</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Enter your new password below</p>
                </div>

                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-200 rounded-lg dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                        <input
                            type="password"
                            {...register('password')}
                            className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                        <p className="mt-1 text-xs text-red-500">{errors.password?.message}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                        <input
                            type="password"
                            {...register('confirmPassword')}
                            className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                        <p className="mt-1 text-xs text-red-500">{errors.confirmPassword?.message}</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
