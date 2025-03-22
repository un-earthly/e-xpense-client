import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../store/services/authApi';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { RegistrationFormInputs } from '../interfaces/auth';
import { ApiErrorResponse } from '../interfaces/common';


export default function RegistrationPage() {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegistrationFormInputs>();
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const password = watch('password');

    const onSubmit = async (data: RegistrationFormInputs) => {
        try {
            const result = await register({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            }).unwrap();

            if (result.success) {
                navigate('/login');
            }
        } catch (err: any) {
            const error = err as ApiErrorResponse;
            const errorMessage = error.error?.details?.message?.[0] || error.message || 'Registration failed';
            setServerError(errorMessage);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="E-xpense"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Create your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {serverError && (
                        <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded-md">
                            {serverError}
                        </div>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">
                                    First Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...registerField('firstName', {
                                            required: 'First name is required',
                                            minLength: {
                                                value: 2,
                                                message: 'First name must be at least 2 characters',
                                            },
                                        })}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    {errors.firstName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">
                                    Last Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...registerField('lastName', {
                                            required: 'Last name is required',
                                            minLength: {
                                                value: 2,
                                                message: 'Last name must be at least 2 characters',
                                            },
                                        })}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    {errors.lastName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    {...registerField('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    type="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            <div className="space-y-1">
                                <div className="relative">
                                    <input
                                        {...registerField('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 8,
                                                message: 'Password must be at least 8 characters',
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d!@#$%^&*(),.?":{}|<>])/,
                                                message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
                                            },
                                        })}
                                        type={showPassword ? 'text' : 'password'}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">
                                Confirm Password
                            </label>
                            <div className="space-y-1">
                                <div className="relative">
                                    <input
                                        {...registerField('confirmPassword', {
                                            required: 'Please confirm your password',
                                            validate: value =>
                                                value === password || 'Passwords do not match',
                                        })}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                {...registerField('terms', {
                                    required: 'You must accept the terms and conditions',
                                })}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                I agree to the{' '}
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have an account?{' '}
                        <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
