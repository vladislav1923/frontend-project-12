import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import authSlice from './authSlice';
import channelsSlice from './channelsSlice';
import messagesSlice from './messagesSlice';
import {createSocketMiddleware} from "./socketModdleware";

const socket = io();

export default configureStore({
    reducer: {
        auth: authSlice,
        channels: channelsSlice,
        messages: messagesSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(createSocketMiddleware(socket)),
});
