import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import channelsSlice from './channelsSlice';
import messagesSlice from './messagesSlice';

export default configureStore({
    reducer: {
        auth: authSlice,
        channels: channelsSlice,
        messages: messagesSlice,
    },
});
