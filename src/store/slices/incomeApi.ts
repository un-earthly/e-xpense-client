import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Income, IncomeFilters } from '../../interfaces/income';

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
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Income'],
    endpoints: (builder) => ({
        getIncomes: builder.query<GetIncomesResponse, GetIncomesRequest>({
            query: ({ page, pageSize, filters, sortField, sortDirection }) => ({
                url: 'incomes',
                params: {
                    page,
                    pageSize,
                    ...filters,
                    sortField,
                    sortDirection,
                },
            }),
            providesTags: ['Income'],
        }),

        addIncome: builder.mutation<Income, Partial<Income>>({
            query: (income) => ({
                url: 'incomes',
                method: 'POST',
                body: income,
            }),
            invalidatesTags: ['Income'],
        }),

        updateIncome: builder.mutation<Income, Partial<Income>>({
            query: (income) => ({
                url: `incomes/${income.id}`,
                method: 'PUT',
                body: income,
            }),
            invalidatesTags: ['Income'],
        }),

        deleteIncome: builder.mutation<void, string>({
            query: (id) => ({
                url: `incomes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Income'],
        }),
    }),
});

export const {
    useGetIncomesQuery,
    useAddIncomeMutation,
    useUpdateIncomeMutation,
    useDeleteIncomeMutation,
} = incomeApi;