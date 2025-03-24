import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Budget, BudgetResponse } from '../../interfaces/budget';
import budgetData from '../../../budget-data.json';

const convertToBudget = (data: any): Budget => ({
    id: data.id,
    category: data.category,
    amount: data.amount,
    spent: data.spent,
    period: data.period,
    startDate: data.startDate,
    endDate: data.endDate,
    status: data.status,
    ...(data.notes && { notes: data.notes })
});

export const budgetApi = createApi({
    reducerPath: 'budgetApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ['Budget'],
    endpoints: (builder) => ({
        getBudgets: builder.query<BudgetResponse, void>({
            queryFn: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const budgets = budgetData.budgets.map(convertToBudget);
                        resolve({
                            data: {
                                budgets,
                                total: budgets.length,
                                categories: budgetData.categories
                            }
                        });
                    }, 500);
                });
            },
            providesTags: ['Budget']
        }),

        addBudget: builder.mutation<Budget, Partial<Budget>>({
            queryFn: (newBudget) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const budget = convertToBudget({
                            id: Date.now().toString(),
                            spent: 0,
                            status: 'active',
                            ...newBudget
                        });
                        budgetData.budgets.unshift(budget);
                        resolve({ data: budget });
                    }, 500);
                });
            },
            invalidatesTags: ['Budget']
        }),

        updateBudget: builder.mutation<Budget, Partial<Budget>>({
            queryFn: (updatedBudget) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const index = budgetData.budgets.findIndex(b => b.id === updatedBudget.id);
                        if (index !== -1) {
                            const budget = convertToBudget({
                                ...budgetData.budgets[index],
                                ...updatedBudget
                            });
                            budgetData.budgets[index] = budget;
                            resolve({ data: budget });
                        } else {
                            reject(new Error('Budget not found'));
                        }
                    }, 500);
                });
            },
            invalidatesTags: ['Budget']
        }),

        deleteBudget: builder.mutation<void, string>({
            queryFn: (id) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const index = budgetData.budgets.findIndex(b => b.id === id);
                        if (index !== -1) {
                            budgetData.budgets.splice(index, 1);
                            resolve({ data: undefined });
                        } else {
                            reject(new Error('Budget not found'));
                        }
                    }, 500);
                });
            },
            invalidatesTags: ['Budget']
        })
    })
});

export const {
    useGetBudgetsQuery,
    useAddBudgetMutation,
    useUpdateBudgetMutation,
    useDeleteBudgetMutation 
} = budgetApi;