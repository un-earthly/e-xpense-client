import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import dashboardData from '../../../dashboard-data.json';
import { DashboardData } from '../../interfaces/dashboard-common';

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        getDashboardData: builder.query<DashboardData, void>({
            queryFn: () => {
                return new Promise<{ data: DashboardData }>((resolve) => {
                    setTimeout(() => {
                        const typedData = {
                            ...dashboardData,
                            stats: dashboardData.stats.map(stat => ({
                                ...stat,
                                changeType: stat.changeType as 'increase' | 'decrease'
                            }))
                        } as DashboardData;
                        resolve({ data: typedData });
                    }, 500);
                });
            },
        }),
    }),
});

export const { useGetDashboardDataQuery } = dashboardApi;