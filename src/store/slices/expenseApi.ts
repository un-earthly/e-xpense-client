import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Expense, ExpenseQueryParams, ExpenseResponse } from '../../interfaces/expense';
import expensesData from '../../../expense-data.json';


const convertToExpense = (exp: any): Required<Expense> => ({
    id: exp.id,
    description: exp.description,
    amount: exp.amount,
    category: exp.category,
    date: exp.date,
    paymentMethod: exp.paymentMethod,
    status: exp.status,
    isRecurring: exp.isRecurring ?? false,
    tags: exp.tags ?? [],
    notes: exp.notes ?? ''
});

export const expenseApi = createApi({
    reducerPath: 'expenseApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ['Expense'],
    endpoints: (builder) => ({
        getExpenses: builder.query<ExpenseResponse, ExpenseQueryParams>({
            queryFn: ({ page, pageSize, filters, sortField, sortDirection }) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        // Convert all expenses to match the interface
                        let filteredExpenses = expensesData.expenses.map(convertToExpense);

                        // Apply filters
                        if (filters) {
                            filteredExpenses = filteredExpenses.filter(exp => {
                                let matches = true;

                                if (filters.startDate) {
                                    matches = matches && new Date(exp.date) >= new Date(filters.startDate);
                                }

                                if (filters.endDate) {
                                    matches = matches && new Date(exp.date) <= new Date(filters.endDate);
                                }

                                if (filters.category && filters.category !== 'all') {
                                    matches = matches && exp.category === filters.category;
                                }

                                if (filters.paymentMethod && filters.paymentMethod !== 'all') {
                                    matches = matches && exp.paymentMethod === filters.paymentMethod;
                                }

                                if (filters.status && filters.status !== 'all') {
                                    matches = matches && exp.status === filters.status;
                                }

                                if (filters.searchTerm) {
                                    matches = matches && exp.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
                                }

                                if (filters.isRecurring !== undefined) {
                                    matches = matches && exp.isRecurring === filters.isRecurring;
                                }

                                if (filters.minAmount !== undefined) {
                                    matches = matches && exp.amount >= Number(filters.minAmount);
                                }

                                if (filters.maxAmount !== undefined) {
                                    matches = matches && exp.amount <= Number(filters.maxAmount);
                                }

                                return matches;
                            });
                        }
                        if (sortField) {
                            filteredExpenses.sort((a, b) => {
                                const aVal = sortField ? a[sortField] : null;
                                const bVal = sortField ? b[sortField] : null;

                                if (typeof aVal === 'string' && typeof bVal === 'string') {
                                    return sortDirection === 'asc'
                                        ? aVal.localeCompare(bVal)
                                        : bVal.localeCompare(aVal);
                                }

                                if (aVal === undefined || bVal === undefined || aVal === null || bVal === null) return 0;

                                return sortDirection === 'asc'
                                    ? (aVal > bVal ? 1 : -1)
                                    : (bVal > aVal ? 1 : -1);
                            });
                        }

                        
                        const start = page * pageSize;
                        const paginatedExpenses = filteredExpenses.slice(start, start + pageSize);

                        resolve({
                            data: {
                                expenses: paginatedExpenses,
                                total: filteredExpenses.length,
                                categories: expensesData.categories
                            }
                        });
                    }, 500);
                });
            },
            providesTags: ['Expense']
        }),

        addExpense: builder.mutation<Expense, Partial<Expense>>({
            queryFn: (newExpense) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const expense = convertToExpense({
                            id: Date.now(),
                            description: '',
                            amount: 0,
                            category: '',
                            date: new Date().toISOString(),
                            paymentMethod: 'cash',
                            status: 'completed',
                            isRecurring: false,
                            ...newExpense
                        });
                        expensesData.expenses.unshift(expense);
                        resolve({ data: expense });
                    }, 500);
                });
            },
            invalidatesTags: ['Expense']
        }),

        updateExpense: builder.mutation<Expense, Partial<Expense>>({
            queryFn: (updatedExpense) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const index = expensesData.expenses.findIndex(e => String(e.id) === updatedExpense.id);
                        if (index !== -1) {
                            const updated = convertToExpense({
                                ...expensesData.expenses[index],
                                ...updatedExpense
                            });
                            expensesData.expenses[index] = updated;
                            resolve({ data: updated });
                        } else {
                            reject(new Error('Expense not found'));
                        }
                    }, 500);
                });
            },
            invalidatesTags: ['Expense']
        })
    })
});

export const {
    useGetExpensesQuery,
    useAddExpenseMutation,
    useUpdateExpenseMutation
} = expenseApi;