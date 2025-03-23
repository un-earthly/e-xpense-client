import { useForm } from 'react-hook-form';
import { RecurringExpenseFormInputs } from '../interfaces/dashboard-common';



interface RecurringExpenseFormProps {
    onSubmit: (data: RecurringExpenseFormInputs) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function RecurringExpenseForm({ onSubmit, onCancel, isLoading }: RecurringExpenseFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RecurringExpenseFormInputs>({
        defaultValues: {
            startDate: new Date().toISOString().split('T')[0],
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Amount
                </label>
                <div className="mt-1">
                    <input
                        type="number"
                        step="0.01"
                        {...register('amount', {
                            required: 'Amount is required',
                            min: { value: 0.01, message: 'Amount must be greater than 0' },
                        })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.amount && (
                        <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <div className="mt-1">
                    <select
                        {...register('category', { required: 'Category is required' })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="">Select a category</option>
                        <option value="Bills">Bills</option>
                        <option value="Subscriptions">Subscriptions</option>
                        <option value="Rent">Rent</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.category && (
                        <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                    Frequency
                </label>
                <div className="mt-1">
                    <select
                        {...register('frequency', { required: 'Frequency is required' })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="">Select frequency</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                    {errors.frequency && (
                        <p className="mt-1 text-sm text-red-600">{errors.frequency.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date
                </label>
                <div className="mt-1">
                    <input
                        type="date"
                        {...register('startDate', { required: 'Start date is required' })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.startDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                    )}
                </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
                >
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </form>
    );
}