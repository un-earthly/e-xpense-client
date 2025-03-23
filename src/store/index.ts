import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import { dashboardApi } from './services/dashboardApi';
import authReducer from './slices/authSlice';
import { expenseApi } from './services/expenseApi';
import { incomeApi } from './services/incomeApi';
import { categoryApi } from './services/categoryApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [expenseApi.reducerPath]: expenseApi.reducer,
        [incomeApi.reducerPath]: incomeApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(dashboardApi.middleware)
            .concat(expenseApi.middleware)
            .concat(incomeApi.middleware)
            .concat(categoryApi.middleware)

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;