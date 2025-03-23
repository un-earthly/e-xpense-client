import { useForm } from 'react-hook-form';
import { TransactionFormInputs } from '../interfaces/dashboard-common';


interface TransactionFormProps {
    onSubmit: (data: TransactionFormInputs) => void;
    onCancel: () => void;
    type: 'expense' | 'income';
    isLoading?: boolean;
}

export default function TransactionForm({ onSubmit, onCancel, type, isLoading }: TransactionFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TransactionFormInputs>({
        defaultValues: {
            date: new Date().toISOString().split('T')[0],
        },
    });

    const categories = type === 'expense'
        ? ['Food', 'Transportation', 'Entertainment', 'Bills', 'Other']
        : ['Salary', 'Freelance', 'Investments', 'Other'];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                            min: { value: 0.01, message: 'Amount must be greater than 0' }
                        })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.amount && (
                        <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        {...register('description', { required: 'Description is required' })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
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
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                </label>
                <div className="mt-1">
                    <input
                        type="date"
                        {...register('date', { required: 'Date is required' })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.date && (
                        <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                    Note (Optional)
                </label>
                <div className="mt-1">
                    <textarea
                        {...register('note')}
                        rows={3}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
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