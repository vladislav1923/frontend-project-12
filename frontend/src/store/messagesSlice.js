import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const API_PATH = '/api/v1/messages';

const initialState = {
    messages: [],
    requestState: null, // 'pending' | 'succeeded' | 'failed'
    chat: {
        requestState: null, // 'pending' | 'succeeded' | 'failed'
    }
};

export const getMessages = createAsyncThunk(
    'messages/get',
    async (_, {getState}) => {
        const state = getState();
        const response = await fetch(API_PATH, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${state?.auth?.token}`,
            },
        });

        const data = await response.json();

        return { data };
    }
);

export const addMessage = createAsyncThunk(
    'messages/add',
    async (body, {getState}) => {
        const state = getState();
        const response = await fetch(API_PATH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${state?.auth?.token}`,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        return { data };
    }
);

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.pending, (state) => {
                state.requestState = 'pending';
            })
            .addCase(getMessages.fulfilled, (state, {payload}) => {
                const { data } = payload;
                if (!data.error) {
                    state.messages = data;
                    state.requestState = 'succeeded';
                } else {
                    state.requestState = 'failed';
                }
            })
            .addCase(addMessage.pending, (state) => {
                state.chat.requestState = 'pending';
            })
            .addCase(addMessage.fulfilled, (state) => {
                state.chat.requestState = 'succeeded';
            });
    },
});

// export const {} = messagesSlice.actions;

export default messagesSlice.reducer;
