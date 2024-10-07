import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {deleteLocalStorageItem, setLocalStorageItem, getLocalStorageItem} from "../utils/local-storage";

const API_PATH = '/api/v1/login';
const AUTH_DATA_LOCAL_STORAGE_KEY = 'auth_data';

const storedData = getLocalStorageItem(AUTH_DATA_LOCAL_STORAGE_KEY);
const parsedData = storedData ? JSON.parse(storedData) : null;

const initialState = {
    token: parsedData ? parsedData.token : null,
    username: parsedData ? parsedData.username : null,
    isLoading: false,
    error: false,
    isAuthenticated: !!parsedData,
};

export const login = createAsyncThunk(
    'auth/login',
    async (args) => {
        deleteLocalStorageItem(AUTH_DATA_LOCAL_STORAGE_KEY);

        const response = await fetch(API_PATH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(args)
        });

        const data = await response.json();

        setLocalStorageItem(AUTH_DATA_LOCAL_STORAGE_KEY, JSON.stringify(data));

        return { data };
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = false;
                state.isAuthenticated = false;
            })
            .addCase(login.fulfilled, (state, {payload}) => {
                const { data } = payload;
                if (data.error) {
                    state.error = true;
                } else {
                    state.token = data.token;
                    state.username = data.username;
                    state.isAuthenticated = true;
                }

                state.isLoading = false;
            })
    },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
