import { Expense } from './expense';
import { Income } from './income.ts';

export type Transaction = Expense | Income;

export interface TransactionTableProps<T extends Transaction> {
    data: T[];
    sortField: keyof T;
    sortDirection: 'asc' | 'desc';
    onSort: (field: keyof T) => void;
    onEdit: (transaction: T) => void;
    type: 'income' | 'expense';
}