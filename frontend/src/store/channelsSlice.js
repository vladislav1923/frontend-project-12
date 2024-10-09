import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {initMessages} from "./messagesSlice";

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
    }
};

export const initChannels = createAsyncThunk(
    'channels/get',
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

export const addChannel = createAsyncThunk(
    'channels/add',
    async (body, {getState, dispatch}) => {
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

export const renameChannel = createAsyncThunk(
    'channels/update',
    async (body, {getState}) => {
        const state = getState();
        const response = await fetch(`${API_PATH}/${body.id}`, {
            method: 'PATCH',
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

export const removeChannel = createAsyncThunk(
    'channels/remove',
    async (body, {getState}) => {
        const state = getState();
        const response = await fetch(`${API_PATH}/${body.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${state?.auth?.token}`,
            },
        });

        const data = await response.json();

        return { data };
    }
);

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setActiveChannel(state, {payload}) {
            state.chat.activeChannel = payload;
        },
        openModal(state, {payload}) {
            state.modal.isOpen = true;
            state.modal.type = payload.type;
            state.modal.name = payload.name ?? null;
            state.modal.id = payload.id ?? null;
            state.modal.requestState = null;
        },
        closeModal(state) {
            state.modal.isOpen = false;
            state.modal.type = null;
            state.modal.name = null;
            state.modal.id = null;
            state.modal.requestState = null;
        },
        handleMessageGotAdded(state, {payload}) {
            const current = state.messages[payload.channelId] ?? [];
            const found = current.find((message) => message.id === payload.id);
            if (!found) {
                state.messages = {
                    ...state.messages,
                    [payload.channelId]: [...current, payload],
                };
            }
        },
        handleChannelGotAdded(state, {payload}) {
            const found = state.channels.find((channel) => channel.id === payload.id);
            if (!found) {
                state.channels = [...state.channels, payload];
            }
        },
        handleChannelGotRemoved(state, {payload}) {
            const found = state.channels.find((channel) => channel.id === payload.id);
            if (found) {
                state.channels = state.channels.filter((channel) => channel.id !== payload.id);
                delete state.messages[payload.id];
            }
        },
        handleChannelGotRenamed(state, {payload}) {
            const found = state.channels.find((channel) => channel.id === payload.id);
            if (found.name !== payload.name) {
                state.channels = state.channels.map((channel) => {
                    if (channel.id === payload.id) {
                        return payload;
                    }
                    return channel;
                });
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initChannels.pending, (state) => {
                state.requestState = 'pending';
            })
            .addCase(initChannels.fulfilled, (state, {payload}) => {
                const { data } = payload;
                if (!data.error) {
                    state.channels = data;
                    state.chat.activeChannel = data.length > 0 ? data[0] : null;
                    state.requestState = 'succeeded';
                } else {
                    state.requestState = 'failed';
                }
            })
            .addCase(initMessages.fulfilled, (state, {payload}) => {
                if (!payload?.data.error) {
                    state.messages = payload?.data?.reduce((acc, message) => {
                        if (!acc[message.channelId]) {
                            acc[message.channelId] = [];
                        }

                        acc[message.channelId].push(message);

                        return acc;
                    }, {});
                }
            })
            .addCase(addChannel.pending, (state, ) => {
                state.modal.requestState = 'pending';
            })
            .addCase(addChannel.fulfilled, (state, {payload}) => {
                state.modal.requestState = 'succeeded';
                state.chat.activeChannel = payload.data;
            })
            .addCase(renameChannel.pending, (state, ) => {
                state.modal.requestState = 'pending';
            })
            .addCase(renameChannel.fulfilled, (state, {payload}) => {
                state.modal.requestState = 'succeeded';
            })
            .addCase(removeChannel.pending, (state, ) => {
                state.modal.requestState = 'pending';
            })
            .addCase(removeChannel.fulfilled, (state, {payload}) => {
                state.modal.requestState = 'succeeded';
            });
    },
});

export const {setActiveChannel, openModal, closeModal} = channelsSlice.actions;

export default channelsSlice.reducer;
