export interface Budget {
    id: string;
    category: string;
    amount: number;
    spent: number;
    period: 'monthly' | 'weekly' | 'yearly';
    startDate: string;
    endDate: string;
    status: 'active' | 'warning' | 'exceeded';
    notes?: string;
}

export interface BudgetFilters {
    category?: string;
    period?: string;
    status?: string;
    searchTerm?: string;
}

export interface BudgetResponse {
    budgets: Budget[];
    total: number;
    categories: string[];
}