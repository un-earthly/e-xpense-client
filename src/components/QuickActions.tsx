import { PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Modal from './Modal'
import { TransactionFormInputs } from '../interfaces/dashboard-common'
import TransactionForm from './TransactionForm'


export default function QuickActions() {
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false)

    const handleExpenseSubmit = async (data: TransactionFormInputs) => {
        console.log('Expense data:', data)
        // TODO: Add API call to save expense
        setIsExpenseModalOpen(false)
    }

    const handleIncomeSubmit = async (data: TransactionFormInputs) => {
        console.log('Income data:', data)
        // TODO: Add API call to save income
        setIsIncomeModalOpen(false)
    }

    return (
        <>
            <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
                <button
                    onClick={() => setIsExpenseModalOpen(true)}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 focus:outline-none"
                >
                    <PlusIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">Add Expense</span>
                </button>
                <button
                    onClick={() => setIsIncomeModalOpen(true)}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-500 focus:outline-none"
                >
                    <PlusIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">Add Income</span>
                </button>
            </div>

            <Modal
                open={isExpenseModalOpen}
                onClose={() => setIsExpenseModalOpen(false)}
                title="Add Expense"
            >
                <TransactionForm
                    type="expense"
                    onSubmit={handleExpenseSubmit}
                    onCancel={() => setIsExpenseModalOpen(false)}
                />
            </Modal>

            <Modal
                open={isIncomeModalOpen}
                onClose={() => setIsIncomeModalOpen(false)}
                title="Add Income"
            >
                <TransactionForm
                    type="income"
                    onSubmit={handleIncomeSubmit}
                    onCancel={() => setIsIncomeModalOpen(false)}
                />
            </Modal>
        </>
    )
}