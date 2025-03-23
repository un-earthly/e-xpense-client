import { useEffect, useState } from 'react';
import { FunnelIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Expense, ExpenseFilters } from '../interfaces/expense';
import Modal from '../components/Modal';
import { useAddExpenseMutation, useGetExpensesQuery, useUpdateExpenseMutation } from '../store/services/expenseApi';
import TransactionForm from '../components/TransactionForm';
import { TransactionPanel } from '../components/TransactionPanel';

export default function Expenses() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [filters, setFilters] = useState<ExpenseFilters>({});
    const [showFilters, setShowFilters] = useState(false);
    const [sortField, setSortField] = useState<keyof Expense>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data } = useGetExpensesQuery({
        page,
        pageSize,
        filters,
        sortField,
        sortDirection
    });

    const [addExpense] = useAddExpenseMutation();
    const [updateExpense] = useUpdateExpenseMutation();

    useEffect(() => {
        setPage(0);
    }, [pageSize]);

    const handleSort = (field: keyof Expense) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleSubmit = async (formData: Partial<Expense>) => {
        try {
            if (selectedExpense) {
                await updateExpense({ ...formData, id: selectedExpense.id });
            } else {
                await addExpense(formData);
            }
            setIsModalOpen(false);
            setSelectedExpense(null);
        } catch (error) {
            console.error('Failed to save expense:', error);
        }
    };

    const handleFilterChange = (key: keyof ExpenseFilters, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value === 'all' ? undefined : value
        }));
        setPage(0);
    };

    const handleFilterReset = () => {
        setFilters({});
        setPage(0);
    };

    return (
        <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Header */}
                <div className="sm:flex sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">Expenses</h1>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                            Add Expense
                        </button>
                    </div>
                </div>

                {/* Filter Toggle and Count */}
                <div className="mt-4 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => setShowFilters(!showFilters)}
                        className="inline-flex items-center text-sm text-gray-700"
                    >
                        <FunnelIcon className="mr-1.5 h-5 w-5 text-gray-400" />
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                    <div className="flex items-center space-x-4">
                        {Object.keys(filters).length > 0 && (
                            <button
                                type="button"
                                onClick={handleFilterReset}
                                className="text-sm text-indigo-600 hover:text-indigo-900"
                            >
                                Reset Filters
                            </button>
                        )}
                        <span className="text-sm text-gray-700">
                            {data?.total ?? 0} expenses found
                        </span>
                    </div>
                </div>

                {/* Main Content - Remove the showFilters condition */}
                <div className="mt-4 bg-white shadow sm:rounded-lg">
                    <TransactionPanel<Expense, ExpenseFilters>
                        data={data?.expenses || []}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onSort={handleSort}
                        sortField={sortField}
                        sortDirection={sortDirection}
                        onEdit={(expense) => {
                            setSelectedExpense(expense);
                            setIsModalOpen(true);
                        }}
                        categories={data?.categories || []}
                        pageSize={pageSize}
                        onPageSizeChange={setPageSize}
                        total={data?.total || 0}
                        currentPage={page}
                        onPageChange={setPage}
                        type="expense"
                        onResetFilters={handleFilterReset}
                        showFilters={showFilters}
                    />
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <Modal
                        title={selectedExpense ? 'Edit Expense' : 'Add Expense'}
                        open={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedExpense(null);
                        }}
                    >
                        <TransactionForm
                            type="expense"
                            onSubmit={handleSubmit}
                            initialData={selectedExpense}
                            categories={data?.categories}
                            onCancel={() => {
                                setIsModalOpen(false);
                                setSelectedExpense(null);
                            }}
                        />
                    </Modal>
                )}
            </div>
        </div>
    );
}