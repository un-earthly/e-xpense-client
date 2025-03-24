import { Budget } from '../interfaces/budget';

interface BudgetProgressBarProps {
    budget: Budget;
}

export function BudgetProgressBar({ budget }: BudgetProgressBarProps) {
    const percentage = (budget.spent / budget.amount) * 100;
    const getProgressColor = () => {
        if (percentage >= 100) return 'bg-red-500';
        if (percentage >= 80) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
                className={`${getProgressColor()} h-2.5 rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
            />
        </div>
    );
}