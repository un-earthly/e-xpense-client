import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIResponse, LoginRequest } from '../../interfaces/common';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<APIResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response: APIResponse) => {
                if (response.success && response.data.access_token) {
                    localStorage.setItem('token', response.data.access_token);
                }
                return response;
            },
        }),
    }),
});


export const { useLoginMutation } = authApi;