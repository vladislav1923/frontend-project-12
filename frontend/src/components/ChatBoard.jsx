import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getChannels, openModal, setActiveChannel} from "../store/channelsSlice";
import {getMessages} from "../store/messagesSlice";
import { ChannelButton, PlusButton, MessageForm, MessagesBox } from "./";

function ChatBoard() {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.auth.username);
    const channels = useSelector((state) => state.channels.channels);
    const messages = useSelector((state) => state.channels.messages);
    const activeChannel = useSelector((state) => state.channels.activeChannel);
    const isChannelsLoading = useSelector((state) => state.channels.isLoading);
    const isMessagesLoading = useSelector((state) => state.messages.isLoading);

    useEffect(() => {
        dispatch(getChannels());
        dispatch(getMessages());
    }, []);

    if (isChannelsLoading || isMessagesLoading) {
        return '...loading';
    }

    return (
        <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                    <b>Каналы</b>
                    <PlusButton onClick={() => dispatch(openModal())} />
                </div>
                <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                    {channels.map((channel) => (
                        <li key={channel.id} className="nav-item w-100">
                            <ChannelButton
                                isActive={activeChannel?.id === channel.id}
                                onClick={() => dispatch(setActiveChannel(channel))}
                            >
                                {channel.name}
                            </ChannelButton>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col p-0 h-100">
                <div className="d-flex flex-column h-100">
                    <div className="bg-light mb-4 p-3 shadow-sm small">
                        <p className="m-0">
                            <b># {activeChannel?.name}</b>
                        </p>
                        <span className="text-muted">{messages[activeChannel?.id]?.length ?? 0} сообщений</span>
                    </div>
                    <MessagesBox messages={messages[activeChannel?.id]} />
                    <div className="mt-auto px-5 py-3">
                        <MessageForm channelId={activeChannel?.id} username={username} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatBoard;
