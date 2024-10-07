import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getMessages} from "./messagesSlice";

const API_PATH = '/api/v1/channels';

const initialState = {
    channels: [],
    messages: {},
    activeChannel: null,
    isLoading: false,
    error: false,
    isOpenModal: false,
};

export const getChannels = createAsyncThunk(
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

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setActiveChannel(state, {payload}) {
            state.activeChannel = payload;
        },
        openModal(state) {
            state.isOpenModal = true;
        },
        closeModal(state) {
            state.isOpenModal = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChannels.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(getChannels.fulfilled, (state, {payload}) => {
                const { data } = payload;
                if (data.error) {
                    state.error = true;
                } else {
                    state.channels = data;
                    state.activeChannel = data.length > 0 ? data[0] : null;
                }

                state.isLoading = false;
            })
            .addCase(getMessages.fulfilled, (state, {payload}) => {
                state.messages = payload.data.reduce((acc, message) => {
                    if (!acc[message.channelId]) {
                        acc[message.channelId] = [];
                    }

                    acc[message.channelId].push(message);

                    return acc;
                }, {});
            });
    },
});

export const {setActiveChannel, openModal, closeModal} = channelsSlice.actions;

export default channelsSlice.reducer;
