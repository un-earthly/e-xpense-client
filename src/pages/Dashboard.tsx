import { ArrowDownIcon, ArrowUpIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { useGetDashboardDataQuery } from '../store/services/dashboardApi';
import QuickActions from '../components/QuickActions';
import DashboardSkeleton from '../components/DashboardSkeleton';

import { usePagination } from '../hooks/usePagination';
import StatsCard from '../components/StatsCard';
import AreaChartComponent from '../components/AreaChartComponent';
import PieChartComponent from '../components/PieChartComponent';

import { ComponentType, useState } from 'react';
import Modal from '../components/Modal';
import { RecurringExpenseFormInputs } from '../interfaces/dashboard-common';
import RecurringExpenseForm from '../components/RecurringExpenseForm';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export default function Dashboard() {
    const { data, isLoading, error } = useGetDashboardDataQuery();
    const {
        paginatedItems: paginatedTransactions,
        pageSize,
        setPageSize,
        pageIndex,
        setPageIndex,
    } = usePagination(data?.recentTransactions || [], 10);

    const iconMap: Record<string, ComponentType<{ className?: string }>> = {
        'Total Balance': CurrencyDollarIcon,
        'Total Expenses': ArrowDownIcon,
        'Total Income': ArrowUpIcon,
    };

    const [isRecurringModalOpen, setIsRecurringModalOpen] = useState(false);

    const handleRecurringExpenseSubmit = async (data: RecurringExpenseFormInputs) => {
        // TODO: Add API call to save recurring expense
        console.log('New recurring expense:', data);
        setIsRecurringModalOpen(false);
    };

    if (isLoading) return <DashboardSkeleton />;
    if (error || !data) return <div>Error loading dashboard data</div>;

    return (
        <div className="space-y-6">
            <QuickActions />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.stats.map((item) => {
                    const Icon = iconMap[item.name];
                    return (
                        <StatsCard
                            key={item.name}
                            {...item}
                            Icon={Icon}
                        />
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Activity Graph */}
                <div className="rounded-lg bg-white shadow">
                    <div className="p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Income vs Expenses</h3>
                        <AreaChartComponent
                            data={data.monthlyData}
                            dataKeys={[
                                { key: 'income', color: '#10b981', name: 'Income' },
                                { key: 'expense', color: '#ef4444', name: 'Expense' },
                            ]}
                        />
                    </div>
                </div>

                {/* Top Categories */}
                <div className="rounded-lg bg-white shadow">
                    <div className="p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Top Categories</h3>
                        <PieChartComponent data={data.topCategories} colors={COLORS} />
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="rounded-lg bg-white shadow">
                <div className="p-6">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Recent Transactions
                        </h3>
                        <div className="mt-3 sm:ml-4 sm:mt-0">
                            <div className="flex rounded-md shadow-sm">
                                <select
                                    className="rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={pageSize}
                                    onChange={(e) => setPageSize(Number(e.target.value))}
                                >
                                    <option value={5}>5 per page</option>
                                    <option value={10}>10 per page</option>
                                    <option value={20}>20 per page</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                            <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {paginatedTransactions.map((transaction) => (
                                            <tr key={transaction.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                    {transaction.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.category}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {format(new Date(transaction.date), 'MMM dd, yyyy')}
                                                </td>
                                                <td className={`whitespace-nowrap px-3 py-4 text-right text-sm ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">{pageIndex * pageSize + 1}</span> to{' '}
                            <span className="font-medium">
                                {Math.min((pageIndex + 1) * pageSize, data.recentTransactions.length)}
                            </span>{' '}
                            of <span className="font-medium">{data.recentTransactions.length}</span> results
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setPageIndex(pageIndex - 1)}
                                disabled={pageIndex === 0}
                                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPageIndex(pageIndex + 1)}
                                disabled={(pageIndex + 1) * pageSize >= data.recentTransactions.length}
                                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spending Insights */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Highest Spending Day */}
                <div className="rounded-lg bg-white shadow">
                    <div className="p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Highest Spending Day
                        </h3>
                        <div className="mt-4">
                            <div className="text-3xl font-bold text-gray-900">
                                {data.highestSpendingDay.amount.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                                on {format(new Date(data.highestSpendingDay.date), 'MMMM do')} with{' '}
                                {data.highestSpendingDay.transactions} transactions
                            </p>
                        </div>
                    </div>
                </div>

                {/* Upcoming Bills */}
                <div className="rounded-lg bg-white shadow">
                    <div className="p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Upcoming Bills
                        </h3>
                        <div className="mt-4 space-y-4">
                            {data.upcomingBills.map((bill) => (
                                <div key={bill.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{bill.name}</p>
                                        <p className="text-sm text-gray-500">
                                            Due {format(new Date(bill.dueDate), 'MMM dd')}
                                        </p>
                                    </div>
                                    <span className="text-sm font-medium text-red-600">
                                        {bill.amount.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        })}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Spending Insights */}
                <div className="rounded-lg bg-white shadow lg:col-span-2">
                    <div className="p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Spending Insights
                        </h3>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {data.spendingInsights.map((insight) => (
                                <div key={insight.category} className="rounded-lg border border-gray-200 p-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium text-gray-900">
                                            {insight.category}
                                        </h4>
                                        {insight.trend === 'up' ? (
                                            <ArrowUpIcon className="h-4 w-4 text-red-500" />
                                        ) : insight.trend === 'down' ? (
                                            <ArrowDownIcon className="h-4 w-4 text-green-500" />
                                        ) : null}
                                    </div>
                                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                                        {insight.amount.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        })}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {insight.trend === 'up' ? '+' : ''}{insight.comparedTo}% vs last month
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recurring Expenses */}
            <div className="rounded-lg bg-white shadow lg:col-span-2">
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Recurring Expenses
                        </h3>
                        <button
                            type="button"
                            onClick={() => setIsRecurringModalOpen(true)}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                        >
                            Add Recurring
                        </button>
                    </div>
                    <div className="mt-4 overflow-hidden">
                        <div className="flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead>
                                            <tr>
                                                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Frequency</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Next Due</th>
                                                <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {data.recurringExpenses.map((expense) => (
                                                <tr key={expense.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                                        {expense.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {expense.category}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {expense.frequency}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {format(new Date(expense.nextDueDate), 'MMM dd, yyyy')}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-red-600">
                                                        {expense.amount.toLocaleString('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                        })}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                open={isRecurringModalOpen}
                onClose={() => setIsRecurringModalOpen(false)}
                title="Add Recurring Expense"
            >
                <RecurringExpenseForm
                    onSubmit={handleRecurringExpenseSubmit}
                    onCancel={() => setIsRecurringModalOpen(false)}
                />
            </Modal>
        </div>
    );

}