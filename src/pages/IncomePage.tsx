import { useEffect, useState } from 'react';
import { FunnelIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Income, IncomeFilters } from '../interfaces/income';
import Modal from '../components/Modal';
import { useAddIncomeMutation, useGetIncomesQuery, useUpdateIncomeMutation } from '../store/services/incomeApi';
import TransactionForm from '../components/TransactionForm';
import { TransactionPanel } from '../components/TransactionPanel';

export default function IncomePage() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [filters, setFilters] = useState<IncomeFilters>({});
    const [showFilters, setShowFilters] = useState(false);
    const [sortField, setSortField] = useState<keyof Income>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data } = useGetIncomesQuery({
        page,
        pageSize,
        filters,
        sortField,
        sortDirection
    });

    const [addIncome] = useAddIncomeMutation();
    const [updateIncome] = useUpdateIncomeMutation();

    useEffect(() => {
        setPage(0);
    }, [pageSize]);

    const handleSort = (field: keyof Income) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleSubmit = async (formData: Partial<Income>) => {
        try {
            if (selectedIncome) {
                await updateIncome({ ...formData, id: selectedIncome.id });
            } else {
                await addIncome(formData);
            }
            setIsModalOpen(false);
            setSelectedIncome(null);
        } catch (error) {
            console.error('Failed to save income:', error);
        }
    };

    const handleFilterChange = (key: keyof IncomeFilters, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value === 'all'
                ? undefined
                : (key === 'minAmount' || key === 'maxAmount')
                    ? Number(value) || undefined
                    : value
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
                    <h1 className="text-2xl font-semibold text-gray-900">Income</h1>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                            Add Income
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
                            {data?.total ?? 0} incomes found
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mt-4 bg-white shadow sm:rounded-lg">
                    <TransactionPanel<Income, IncomeFilters>
                        data={data?.incomes || []}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        categories={data?.categories || []}
                        pageSize={pageSize}
                        onPageSizeChange={setPageSize}
                        total={data?.total || 0}
                        currentPage={page}
                        onPageChange={setPage}
                        onSort={handleSort}
                        sortField={sortField}
                        sortDirection={sortDirection}
                        onEdit={(income) => {
                            setSelectedIncome(income);
                            setIsModalOpen(true);
                        }}
                        type="income"
                        onResetFilters={handleFilterReset}
                        showFilters={showFilters}
                    />
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <Modal
                        title='Add Income'
                        open={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedIncome(null);
                        }}
                    >
                        <TransactionForm
                            type="income"
                            onSubmit={handleSubmit}
                            initialData={selectedIncome}
                            categories={data?.categories}
                            onCancel={() => {
                                setIsModalOpen(false);
                                setSelectedIncome(null);
                            }}
                        />
                    </Modal>
                )}
            </div>
        </div>
    );
}