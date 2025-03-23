import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '../../interfaces/category';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            queryFn: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        // Mock data - replace with actual API call
                        resolve({
                            data: [
                                { id: '1', name: 'Food', type: 'expense', color: '#FF5733' },
                                { id: '2', name: 'Salary', type: 'income', color: '#33FF57' },
                                // Add more mock categories...
                            ]
                        });
                    }, 500);
                });
            },
            providesTags: ['Category']
        }),

        addCategory: builder.mutation<Category, Partial<Category>>({
            queryFn: (newCategory) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            data: {
                                id: Date.now().toString(),
                                ...newCategory
                            } as Category
                        });
                    }, 500);
                });
            },
            invalidatesTags: ['Category']
        }),

        updateCategory: builder.mutation<Category, Partial<Category>>({
            queryFn: (updatedCategory) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            data: updatedCategory as Category
                        });
                    }, 500);
                });
            },
            invalidatesTags: ['Category']
        }),

        deleteCategory: builder.mutation<void, string>({
            queryFn: (_) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({ data: undefined });
                    }, 500);
                });
            },
            invalidatesTags: ['Category']
        })
    })
});

export const {
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryApi;