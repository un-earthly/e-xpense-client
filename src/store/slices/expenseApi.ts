import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Expense, ExpenseQueryParams, ExpenseResponse } from '../../interfaces/expense';
import expensesData from '../../../expense-data.json';

export const expenseApi = createApi({
    reducerPath: 'expenseApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ['Expense'],
    endpoints: (builder) => ({
        getExpenses: builder.query<ExpenseResponse, ExpenseQueryParams>({
            queryFn: ({ page, pageSize, filters, sortField, sortDirection }) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        let filteredExpenses = [...expensesData.expenses] as Expense[];

                        // Apply filters
                        if (filters.startDate) {
                            filteredExpenses = filteredExpenses.filter(
                                exp => new Date(exp.date) >= new Date(filters.startDate!)
                            );
                        }

                        // Apply sorting
                        filteredExpenses.sort((a, b) => {
                            const aVal = a[sortField];
                            const bVal = b[sortField];
                            return sortDirection === 'asc'
                                ? (aVal > bVal ? 1 : -1)
                                : (aVal < bVal ? -1 : 1);
                        });

                        // Apply pagination
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
                        const expense: Expense = {
                            id: Date.now(),
                            description: '',
                            amount: 0,
                            category: '',
                            date: new Date().toISOString(),
                            paymentMethod: 'cash',
                            status: 'completed',
                            ...newExpense
                        };
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
                        const index = expensesData.expenses.findIndex(e => e.id === updatedExpense.id);
                        if (index !== -1) {
                            const updated = {
                                ...expensesData.expenses[index],
                                ...updatedExpense
                            } as Expense;
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