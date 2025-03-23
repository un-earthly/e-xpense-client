export interface Expense {
    id: number;
    description: string;
    amount: number;
    category: string;
    date: string;
    paymentMethod: 'cash' | 'credit' | 'debit' | 'online';
    status: 'completed' | 'pending' | 'cancelled';
    tags?: string[];
    notes?: string;
}

export interface ExpenseFilters {
    startDate?: string;
    endDate?: string;
    category?: string;
    minAmount?: number;
    maxAmount?: number;
    paymentMethod?: string;
    status?: string;
    searchTerm?: string;
    isRecurring?: boolean;
}

export interface ExpenseQueryParams {
    page: number;
    pageSize: number;
    filters: ExpenseFilters;
    sortField: keyof Expense;
    sortDirection: 'asc' | 'desc';
}

export interface ExpenseResponse {
    expenses: Expense[];
    total: number;
    categories: string[];
}