
export interface ExpenseData {
    date: string;
    amount: number;
}

export interface Transaction {
    id: number;
    name: string;
    amount: number;
    date: string;
    category: string;
    type: 'income' | 'expense';
}

export interface StatCard {
    name: string;
    stat: string;
    change: string;
    changeType: 'increase' | 'decrease';
}

export interface MonthlyData {
    date: string;
    income: number;
    expense: number;
}

export interface CategoryData {
    name: string;
    amount: number;
    percentage: number;
}

export interface SpendingInsight {
    category: string;
    amount: number;
    percentage: number;
    trend: 'up' | 'down' | 'stable';
    comparedTo: number;
}

export interface UpcomingBill {
    id: number;
    name: string;
    amount: number;
    dueDate: string;
}

export interface DailyExpense {
    date: string;
    amount: number;
}

export interface RecurringExpenseFormInputs {
    name: string;
    amount: number;
    category: string;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    startDate: string;
}
export interface TransactionFormInputs {
    amount: number;
    description: string;
    category: string;
    date: string;
    note?: string;
}

export interface RecurringExpense {
    id: number;
    name: string;
    amount: number;
    category: string;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    nextDueDate: string;
}

export interface DashboardData {
    stats: StatCard[];
    recentTransactions: Transaction[];
    monthlyData: MonthlyData[];
    topCategories: CategoryData[];
    highestSpendingDay: {
        date: string;
        amount: number;
        transactions: number;
    };
    upcomingBills: UpcomingBill[];
    spendingInsights: SpendingInsight[];
    dailyExpenses: DailyExpense[];
    recurringExpenses: RecurringExpense[];
}