import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    user: any | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
        },
    },
});

export const { setUser, clearError, logout } = authSlice.actions;
export default authSlice.reducer;