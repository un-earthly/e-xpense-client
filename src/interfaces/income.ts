export interface Income {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    isRecurring: boolean;
    status: 'completed' | 'pending' | 'cancelled';
    paymentMethod: string;
}

export interface IncomeFilters {
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