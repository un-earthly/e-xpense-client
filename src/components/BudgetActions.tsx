import { Budget } from '../interfaces/budget';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface BudgetActionsProps {
    budget: Budget;
    onEdit: (budget: Budget) => void;
    onDelete: (id: string) => void;
}

export function BudgetActions({ budget, onEdit, onDelete }: BudgetActionsProps) {
    return (
        <div className="absolute top-4 right-4 flex space-x-2">
            <button
                onClick={() => onEdit(budget)}
                className="text-gray-400 hover:text-gray-500"
            >
                <PencilIcon className="h-5 w-5" />
            </button>
            <button
                onClick={() => onDelete(budget.id)}
                className="text-gray-400 hover:text-red-500"
            >
                <TrashIcon className="h-5 w-5" />
            </button>
        </div>
    );
}