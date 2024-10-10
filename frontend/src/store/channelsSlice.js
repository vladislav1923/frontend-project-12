import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initMessages } from './messagesSlice';

const API_PATH = '/api/v1/channels';

const initialState = {
  channels: [],
  messages: {},
  requestState: null, // 'pending' | 'succeeded' | 'failed'
  modal: {
    isOpen: false,
    type: null, // 'add' | 'remove' | 'rename'
    requestState: null, // 'pending' | 'succeeded' | 'failed'
    name: null,
    id: null,
  },
  chat: {
    activeChannel: null,
  },
};

export const initChannels = createAsyncThunk(
  'channels/get',
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

export const addChannel = createAsyncThunk(
  'channels/add',
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

export const renameChannel = createAsyncThunk(
  'channels/rename',
  async (body, { getState }) => {
    const state = getState();
    const response = await fetch(`${API_PATH}/${body.id}`, {
      method: 'PATCH',
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

export const removeChannel = createAsyncThunk(
  'channels/remove',
  async (body, { getState }) => {
    const state = getState();
    const response = await fetch(`${API_PATH}/${body.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${state?.auth?.token}`,
      },
    });

    const data = await response.json();

    return { data };
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannel(state, { payload }) {
      return {
        ...state,
        chat: {
          ...state.chat,
          activeChannel: payload,
        },
      };
    },
    openModal(state, { payload }) {
      return {
        ...state,
        modal: {
          isOpen: true,
          type: payload.type,
          name: payload.name ?? null,
          id: payload.id ?? null,
          requestState: null,
        },
      };
    },
    closeModal(state) {
      return {
        ...state,
        modal: {
          isOpen: false,
          type: null,
          name: null,
          id: null,
          requestState: null,
        },
      };
    },
    handleMessageGotAdded(state, { payload }) {
      const current = state.messages[payload.channelId] ?? [];
      const found = current.find((message) => message.id === payload.id);
      if (!found) {
        return {
          ...state,
          messages: {
            ...state.messages,
            [payload.channelId]: [...current, payload],
          },
        };
      }
      return state;
    },
    handleChannelGotAdded(state, { payload }) {
      const found = state.channels.find((channel) => channel.id === payload.id);
      if (!found) {
        return {
          ...state,
          channels: [...state.channels, payload],
        };
      }
      return state;
    },
    handleChannelGotRemoved(state, { payload }) {
      const found = state.channels.find((channel) => channel.id === payload.id);
      if (found) {
        return {
          ...state,
          channels: state.channels.filter((channel) => channel.id !== payload.id),
          messages: Object.fromEntries(
            Object.entries(state.messages).filter(
              ([key]) => key !== payload.id,
            ),
          ),
          chat: {
            ...state.chat,
            activeChannel: state.chat.activeChannel.id === payload.id
              ? state.channels[0] : state.chat.activeChannel,
          },
        };
      }
      return state;
    },
    handleChannelGotRenamed(state, { payload }) {
      const found = state.channels.find((channel) => channel.id === payload.id);
      if (found && found.name !== payload.name) {
        return {
          ...state,
          channels: state.channels
            .map((channel) => (channel.id === payload.id ? payload : channel)),
        };
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initChannels.pending, (state) => ({
        ...state,
        requestState: 'pending',
      }))
      .addCase(initChannels.fulfilled, (state, { payload }) => {
        const { data } = payload;
        if (!data.error) {
          return {
            ...state,
            channels: data,
            chat: {
              ...state.chat,
              activeChannel: data.length > 0 ? data[0] : null,
            },
            requestState: 'succeeded',
          };
        }
        return {
          ...state,
          requestState: 'failed',
        };
      })
      .addCase(initChannels.rejected, (state) => ({
        ...state,
        requestState: 'failed',
      }))
      .addCase(initMessages.fulfilled, (state, { payload }) => {
        if (!payload?.data.error) {
          return {
            ...state,
            messages: payload?.data?.reduce((acc, message) => {
              if (!acc[message.channelId]) {
                acc[message.channelId] = [];
              }
              acc[message.channelId].push(message);
              return acc;
            }, {}),
          };
        }
        return state;
      })
      .addCase(addChannel.pending, (state) => ({
        ...state,
        modal: {
          ...state.modal,
          requestState: 'pending',
        },
      }))
      .addCase(addChannel.fulfilled, (state, { payload }) => ({
        ...state,
        modal: {
          ...state.modal,
          requestState: 'succeeded',
        },
        chat: {
          ...state.chat,
          activeChannel: payload.data,
        },
      }))
      .addCase(addChannel.rejected, (state) => ({
        ...state,
        modal: {
          ...state.modal,
          requestState: 'failed',
        },
      }))
      .addCase(renameChannel.pending, (state) => ({
        ...state,
        modal: {
          ...state.modal,
          requestState: 'pending',
        },
      }))
      .addCase(renameChannel.fulfilled, (state) => ({
        ...state,
        modal: {
          ...state.modal,
          requestState: 'succeeded',
        },
      }))
      .addCase(renameChannel.rejected, (state) => ({
        ...state,
        modal: {
          ...state.modal,
          requestState: 'failed',
        },
      }))
      .addCase(removeChannel.pending, (state) => ({
        ...state,
        modal: {
          ...state.modal,
          requestState: 'pending',
        },
      }))
      .addCase(removeChannel.fulfilled, (state) => ({
        ...state,
        modal: {
          ...state.modal,
          requestState: 'succeeded',
        },
      }))
      .addCase(removeChannel.rejected, (state) => ({
        ...state,
        modal: {
          ...state.modal,
          requestState: 'failed',
        },
      }));
  },
});

export const { setActiveChannel, openModal, closeModal } = channelsSlice.actions;

export default channelsSlice.reducer;
