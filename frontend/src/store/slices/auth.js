import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {deleteLocalStorageItem, setLocalStorageItem} from "../../utils/local-storage";

export const AUTH_DATA_LOCAL_STORAGE_KEY = 'auth_data';

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            queryFn: async (arg) => {
                try {
                    deleteLocalStorageItem(AUTH_DATA_LOCAL_STORAGE_KEY);

                    const response = await fetch('/api/v1/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(arg)
                    });

                    const data = await response.json();

                    setLocalStorageItem(AUTH_DATA_LOCAL_STORAGE_KEY, JSON.stringify(data));

                    return { data };
                } catch (e) {
                    return { error: e.message };
                }
            },
        }),
    }),
});

export const {
    useLoginMutation,
} = authApi;
