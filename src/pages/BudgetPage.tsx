import { useState } from 'react';
import { PlusIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useGetBudgetsQuery, useAddBudgetMutation, useUpdateBudgetMutation, useDeleteBudgetMutation } from '../store/services/budgetApi';
import { Budget } from '../interfaces/budget';
import Modal from '../components/Modal';
import BudgetForm from '../components/BudgetForm';
import { BudgetProgressBar } from '../components/BudgetProgressBar';
import { BudgetAnalytics } from '../components/BudgetAnalytics';
import { BudgetActions } from '../components/BudgetActions';

export default function BudgetPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
    const { data } = useGetBudgetsQuery();
    const [addBudget] = useAddBudgetMutation();
    const [updateBudget] = useUpdateBudgetMutation();
    const [deleteBudget] = useDeleteBudgetMutation();

    const handleSubmit = async (formData: Partial<Budget>) => {
        try {
            if (selectedBudget) {
                await updateBudget({ ...formData, id: selectedBudget.id });
            } else {
                await addBudget(formData);
            }
            setIsModalOpen(false);
            setSelectedBudget(null);
        } catch (error) {
            console.error('Failed to save budget:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this budget?')) {
            try {
                await deleteBudget(id);
            } catch (error) {
                console.error('Failed to delete budget:', error);
            }
        }
    };

    const getBudgetStatus = (budget: Budget) => {
        const percentage = (budget.spent / budget.amount) * 100;
        if (percentage >= 100) return 'bg-red-100 text-red-800';
        if (percentage >= 80) return 'bg-yellow-100 text-yellow-800';
        return 'bg-green-100 text-green-800';
    };

    return (
        <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">Budget</h1>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                            Add Budget
                        </button>
                    </div>
                </div>

                {/* Budget Overview Cards */}
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {data?.budgets.map((budget) => (
                        <div
                            key={budget.id}
                            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6"
                        >
                            <dt>
                                <div className="absolute rounded-md bg-indigo-500 p-3">
                                    <ChartBarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <p className="ml-16 truncate text-sm font-medium text-gray-500">{budget.category}</p>
                            </dt>
                            <dd className="ml-16 flex items-baseline">
                                <p className="text-2xl font-semibold text-gray-900">
                                    ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                                </p>
                                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                                    <div className="text-sm">
                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getBudgetStatus(budget)}`}>
                                            {((budget.spent / budget.amount) * 100).toFixed(0)}%
                                        </span>
                                        <span className="ml-2">{budget.period}</span>
                                    </div>
                                </div>
                            </dd>
                            <BudgetProgressBar budget={budget} />
                            <BudgetActions
                                budget={budget}
                                onEdit={(budget) => {
                                    setSelectedBudget(budget);
                                    setIsModalOpen(true);
                                }}
                                onDelete={handleDelete}
                            />
                        </div>
                    ))}
                </div>

                {/* Analytics Section */}
                {data?.budgets && <BudgetAnalytics budgets={data.budgets} />}

                <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title='Add Budget'>
                    <BudgetForm
                        onSubmit={handleSubmit}
                        initialData={selectedBudget}
                        categories={data?.categories || []}
                        onCancel={() => {
                            setIsModalOpen(false);
                            setSelectedBudget(null);
                        }}
                    />
                </Modal>

            </div >
        </div >
    );
}