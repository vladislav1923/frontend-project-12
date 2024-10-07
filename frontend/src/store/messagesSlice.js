import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const API_PATH = '/api/v1/messages';

const initialState = {
    messages: [],
    isLoading: false,
    error: false,
    isMessageAdding: false,
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
    async (body, {getState, dispatch}) => {
        const state = getState();
        await fetch(API_PATH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${state?.auth?.token}`,
            },
            body: JSON.stringify(body),
        });

        dispatch(getMessages());
    }
);

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(getMessages.fulfilled, (state, {payload}) => {
                const { data } = payload;
                if (data.error) {
                    state.error = true;
                } else {
                    state.messages = data;
                }

                state.isLoading = false;
            })
            .addCase(addMessage.pending, (state) => {
                state.isMessageAdding = true;
            })
            .addCase(addMessage.fulfilled, (state) => {
                state.isMessageAdding = false;
            })
    },
});

// export const {} = messagesSlice.actions;

export default messagesSlice.reducer;
