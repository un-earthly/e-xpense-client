import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Income, IncomeFilters } from '../../interfaces/income';
import incomesData from '../../../income-data.json';

const convertToIncome = (inc: any): Income => ({
    id: String(inc.id),
    description: inc.description,
    amount: inc.amount,
    category: inc.category,
    date: inc.date,
    paymentMethod: inc.paymentMethod,
    status: inc.status,
    isRecurring: inc.isRecurring ?? false,
    tags: inc.tags ?? [],
    notes: inc.notes ?? ''
});

interface GetIncomesResponse {
    incomes: Income[];
    total: number;
    categories: string[];
}

interface GetIncomesRequest {
    page: number;
    pageSize: number;
    filters?: IncomeFilters;
    sortField?: keyof Income;
    sortDirection?: 'asc' | 'desc';
}

export const incomeApi = createApi({
    reducerPath: 'incomeApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ['Income'],
    endpoints: (builder) => ({
        getIncomes: builder.query<GetIncomesResponse, GetIncomesRequest>({
            queryFn: ({ page, pageSize, filters, sortField, sortDirection }) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        // Convert all incomes to match the interface
                        let filteredIncomes = incomesData.incomes.map(convertToIncome);

                        // Apply filters
                        if (filters) {
                            filteredIncomes = filteredIncomes.filter(inc => {
                                let matches = true;

                                if (filters.startDate) {
                                    matches = matches && new Date(inc.date) >= new Date(filters.startDate);
                                }

                                if (filters.endDate) {
                                    matches = matches && new Date(inc.date) <= new Date(filters.endDate);
                                }

                                if (filters.category && filters.category !== 'all') {
                                    matches = matches && inc.category === filters.category;
                                }

                                if (filters.paymentMethod && filters.paymentMethod !== 'all') {
                                    matches = matches && inc.paymentMethod === filters.paymentMethod;
                                }

                                if (filters.status && filters.status !== 'all') {
                                    matches = matches && inc.status === filters.status;
                                }

                                if (filters.searchTerm) {
                                    matches = matches && inc.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
                                }

                                if (filters.isRecurring !== undefined) {
                                    matches = matches && inc.isRecurring === filters.isRecurring;
                                }

                                if (filters.minAmount !== undefined) {
                                    matches = matches && inc.amount >= Number(filters.minAmount);
                                }

                                if (filters.maxAmount !== undefined) {
                                    matches = matches && inc.amount <= Number(filters.maxAmount);
                                }

                                return matches;
                            });
                        }

                        // Apply sorting
                        if (sortField) {
                            filteredIncomes.sort((a, b) => {
                                const aVal = a[sortField];
                                const bVal = b[sortField];

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

                        // Apply pagination
                        const start = page * pageSize;
                        const paginatedIncomes = filteredIncomes.slice(start, start + pageSize);

                        resolve({
                            data: {
                                incomes: paginatedIncomes,
                                total: filteredIncomes.length,
                                categories: incomesData.categories
                            }
                        });
                    }, 500);
                });
            },
            providesTags: ['Income']
        }),

        addIncome: builder.mutation<Income, Partial<Income>>({
            queryFn: (newIncome) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const income = convertToIncome({
                            id: Date.now(),
                            description: '',
                            amount: 0,
                            category: '',
                            date: new Date().toISOString(),
                            paymentMethod: 'bank transfer',
                            status: 'completed',
                            isRecurring: false,
                            ...newIncome
                        });
                        incomesData.incomes.unshift(income);
                        resolve({ data: income });
                    }, 500);
                });
            },
            invalidatesTags: ['Income']
        }),

        updateIncome: builder.mutation<Income, Partial<Income>>({
            queryFn: (updatedIncome) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const index = incomesData.incomes.findIndex(i => String(i.id) === updatedIncome.id);
                        if (index !== -1) {
                            const updated = convertToIncome({
                                ...incomesData.incomes[index],
                                ...updatedIncome
                            });
                            incomesData.incomes[index] = updated;
                            resolve({ data: updated });
                        } else {
                            reject(new Error('Income not found'));
                        }
                    }, 500);
                });
            },
            invalidatesTags: ['Income']
        }),

        deleteIncome: builder.mutation<void, string>({
            queryFn: (id) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const index = incomesData.incomes.findIndex(i => String(i.id) === id);
                        if (index !== -1) {
                            incomesData.incomes.splice(index, 1);
                            resolve({ data: undefined });
                        } else {
                            reject(new Error('Income not found'));
                        }
                    }, 500);
                });
            },
            invalidatesTags: ['Income']
        })
    })
});

export const {
    useGetIncomesQuery,
    useAddIncomeMutation,
    useUpdateIncomeMutation,
    useDeleteIncomeMutation
} = incomeApi;