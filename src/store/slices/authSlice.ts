import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
    user: any | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

export const verifyToken = createAsyncThunk(
    'auth/verifyToken',
    async (_, {  }) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp * 1000 < Date.now()) {
                throw new Error('Token expired');
            }
            return payload;
        } catch (error) {
            localStorage.removeItem('token');
            throw error;
        }
    }
);

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
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(verifyToken.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            });
    },
});

export const { setUser, clearError, logout } = authSlice.actions;
export default authSlice.reducer;