import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteLocalStorageItem, setLocalStorageItem, getLocalStorageItem } from '../utils/local-storage';

const AUTH_DATA_LOCAL_STORAGE_KEY = 'auth_data';

const storedData = getLocalStorageItem(AUTH_DATA_LOCAL_STORAGE_KEY);
const parsedData = storedData ? JSON.parse(storedData) : null;

const initialState = {
  token: parsedData ? parsedData.token : null,
  username: parsedData ? parsedData.username : null,
  requestState: null, // 'pending' | 'succeeded' | 'failed'
  errorCode: null, // 400 | 409 | 500
  isAuthenticated: !!parsedData,
};

export const login = createAsyncThunk(
  'auth/login',
  async (args) => {
    const response = await fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(args),
    });

    const data = await response.json();

    return { data };
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (args) => {
    const response = await fetch('/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(args),
    });

    const data = await response.json();

    return { data };
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      deleteLocalStorageItem(AUTH_DATA_LOCAL_STORAGE_KEY);
      return {
        ...state,
        token: null,
        username: null,
        isAuthenticated: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => ({
        ...state,
        requestState: 'pending',
        errorMessage: null,
        isAuthenticated: false,
      }))
      .addCase(login.fulfilled, (state, { payload }) => {
        const { data } = payload;
        if (data.error) {
          return {
            ...state,
            errorCode: 400,
            requestState: 'failed',
            isAuthenticated: false,
          };
        }
        const newState = {
          ...state,
          token: data.token,
          username: data.username,
          requestState: 'succeeded',
          isAuthenticated: true,
        };
        setLocalStorageItem(AUTH_DATA_LOCAL_STORAGE_KEY, JSON.stringify(data));
        return newState;
      })
      .addCase(login.rejected, (state) => ({
        ...state,
        requestState: 'failed',
        errorCode: 500,
        isAuthenticated: false,
      }))
      .addCase(signup.pending, (state) => ({
        ...state,
        requestState: 'pending',
        errorMessage: null,
        isAuthenticated: false,
      }))
      .addCase(signup.fulfilled, (state, { payload }) => {
        const { data } = payload;
        console.log(data);
        if (data.error) {
          return {
            ...state,
            errorCode: data.statusCode,
            requestState: 'failed',
            isAuthenticated: false,
          };
        }
        const newState = {
          ...state,
          token: data.token,
          username: data.username,
          requestState: 'succeeded',
          isAuthenticated: true,
        };
        setLocalStorageItem(AUTH_DATA_LOCAL_STORAGE_KEY, JSON.stringify(data));
        return newState;
      })
      .addCase(signup.rejected, (state) => ({
        ...state,
        requestState: 'failed',
        errorCode: 500,
        isAuthenticated: false,
      }));
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
