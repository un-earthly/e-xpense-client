import { BaseFilters } from "./transactions";

export interface Expense {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    status: 'completed' | 'pending' | 'cancelled';
    paymentMethod: string;
    isRecurring: boolean;
    tags?: string[];
    notes?: string;
}

export interface ExpenseFilters extends BaseFilters {
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