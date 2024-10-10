import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_PATH = '/api/v1/messages';

const initialState = {
  messages: [],
  requestState: null, // 'pending' | 'succeeded' | 'failed'
  chat: {
    requestState: null, // 'pending' | 'succeeded' | 'failed'
  },
};

export const initMessages = createAsyncThunk(
  'messages/get',
  async (_, { getState }) => {
    const state = getState();
    const response = await fetch(API_PATH, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${state?.auth?.token}`,
      },
    });

    const data = await response.json();

    return { data };
  },
);

export const addMessage = createAsyncThunk(
  'messages/add',
  async (body, { getState }) => {
    const state = getState();
    const response = await fetch(API_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${state?.auth?.token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return { data };
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initMessages.pending, (state) => ({
        ...state,
        requestState: 'pending',
      }))
      .addCase(initMessages.fulfilled, (state, { payload }) => {
        const { data } = payload;
        return {
          ...state,
          messages: !data.error ? data : state.messages,
          requestState: !data.error ? 'succeeded' : 'failed',
        };
      })
      .addCase(initMessages.rejected, (state) => ({
        ...state,
        requestState: 'failed',
      }))
      .addCase(addMessage.pending, (state) => ({
        ...state,
        chat: {
          ...state.chat,
          requestState: 'pending',
        },
      }))
      .addCase(addMessage.fulfilled, (state) => ({
        ...state,
        chat: {
          ...state.chat,
          requestState: 'succeeded',
        },
      }))
      .addCase(addMessage.rejected, (state) => ({
        ...state,
        chat: {
          ...state.chat,
          requestState: 'failed',
        },
      }));
  },
});

// export const {} = messagesSlice.actions;

export default messagesSlice.reducer;
