import { format } from 'date-fns';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { Transaction, TransactionTableProps } from '../interfaces/transactions';


export default function TransactionTable<T extends Transaction>({
    data,
    sortField,
    sortDirection,
    onSort,
    onEdit,
    type
}: TransactionTableProps<T>) {
    const SortIcon = sortDirection === 'asc' ? ArrowUpIcon : ArrowDownIcon;

    const renderSortIcon = (field: keyof T) => {
        if (sortField === field) {
            return <SortIcon className="inline h-4 w-4 ml-1" />;
        }
        return null;
    };

    const getAmountColor = (amount: number) => {
        console.log(amount)
        if (type === 'expense') {
            return 'text-red-600';
        }
        return 'text-green-600';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                            onClick={() => onSort('description')}
                        >
                            Description
                            {renderSortIcon('description')}
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 cursor-pointer"
                            onClick={() => onSort('amount')}
                        >
                            Amount
                            {renderSortIcon('amount')}
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                            onClick={() => onSort('category')}
                        >
                            Category
                            {renderSortIcon('category')}
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                            onClick={() => onSort('date')}
                        >
                            Date
                            {renderSortIcon('date')}
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                            Status
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                {item.description}
                            </td>
                            <td className={`whitespace-nowrap px-3 py-4 text-right text-sm font-medium ${getAmountColor(item.amount)}`}>
                                {item.amount.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    signDisplay: type === 'expense' ? 'never' : 'never'
                                })}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {item.category}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {format(new Date(item.date), 'MMM dd, yyyy')}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(item.status)}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <button
                                    type="button"
                                    className="text-indigo-600 hover:text-indigo-900"
                                    onClick={() => onEdit(item)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}