export const createSocketMiddleware = (socket) => {
    return (storeAPI) => (next) => (action) => {
        socket.on('newMessage', (message) => {
            storeAPI.dispatch({
                type: 'channels/handleMessageGotAdded',
                payload: message,
            });
        });

        socket.on('newChannel', (message) => {
            storeAPI.dispatch({
                type: 'channels/handleChannelGotAdded',
                payload: message,
            });
        });

        socket.on('removeChannel', (message) => {
            storeAPI.dispatch({
                type: 'channels/handleChannelGotRemoved',
                payload: message,
            });
        });

        socket.on('renameChannel', (message) => {
            storeAPI.dispatch({
                type: 'channels/handleChannelGotRenamed',
                payload: message,
            });
        });

        return next(action);
    };
};
