import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import { dashboardApi } from './services/dashboardApi';
import authReducer from './slices/authSlice';
import { expenseApi } from './slices/expenseApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [expenseApi.reducerPath]: expenseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(dashboardApi.middleware)
            .concat(expenseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;