export interface Transaction {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    isRecurring: boolean;
    status: 'completed' | 'pending' | 'cancelled';
    paymentMethod: string;
}
export interface BaseFilters {
    startDate?: string;
    endDate?: string;
    category?: string;
    paymentMethod?: string;
    status?: string;
    searchTerm?: string;
    isRecurring?: boolean;
    minAmount?: number;
    maxAmount?: number;
}

export interface TransactionFilters {
    startDate?: string;
    endDate?: string;
    category?: string;
    paymentMethod?: string;
    status?: string;
    searchTerm?: string;
    isRecurring?: boolean;
    minAmount?: string;
    maxAmount?: string;
}

export interface TransactionTableProps<T extends Transaction> {
    data: T[];
    sortField: keyof T;
    sortDirection: 'asc' | 'desc';
    onSort: (field: keyof T) => void;
    onEdit: (transaction: T) => void;
    type: 'income' | 'expense';
}