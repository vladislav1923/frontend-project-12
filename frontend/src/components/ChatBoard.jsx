import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { initChannels, openModal, setActiveChannel } from '../store/channelsSlice';
import { initMessages } from '../store/messagesSlice';
import ChannelButton from './ChannelButton';
import PlusButton from './PlusButton';
import MessagesBox from './MessagesBox';
import MessageForm from './MessageForm';

const ChatBoard = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const username = useSelector((state) => state.auth.username);
  const channels = useSelector((state) => state.channels.channels);
  const messages = useSelector((state) => state.channels.messages);
  const activeChannel = useSelector((state) => state.channels.chat.activeChannel);
  const isChannelsFetching = useSelector((state) => state.channels.requestState === 'pending');
  const isMessagesFetching = useSelector((state) => state.messages.requestState === 'pending');
  const isChannelsError = useSelector((state) => state.channels.requestState === 'failed');
  const isMessagesError = useSelector((state) => state.messages.requestState === 'failed');

  useEffect(() => {
    dispatch(initChannels());
    dispatch(initMessages());
  }, [dispatch]);

  useEffect(() => {
    if (isChannelsError || isMessagesError) {
      toast.error(t('chatBoard.errorText'));
    }
  }, [isChannelsError, isMessagesError, t]);

  if (isChannelsFetching || isMessagesFetching) {
    return t('chatBoard.loadingText');
  }

  return (
    <div className="row h-100 bg-white flex-md-row">
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('chatBoard.channelsTitle')}</b>
          <PlusButton onClick={() => dispatch(openModal({ type: 'add' }))} />
        </div>
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {channels.map((channel) => (
            <li key={channel.id} className="nav-item w-100">
              <ChannelButton
                channel={channel}
                isActive={activeChannel?.id === channel.id}
                onClick={() => dispatch(setActiveChannel(channel))}
                onRename={() => dispatch(openModal({ type: 'rename', name: channel.name, id: channel.id }))}
                onRemove={() => dispatch(openModal({ type: 'remove', id: channel.id }))}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b>
                #
                {' '}
                {activeChannel?.name}
              </b>
            </p>
            <span className="text-muted">
              {t('chatBoard.messagesCount', { count: messages[activeChannel?.id]?.length ?? 0 })}
            </span>
          </div>
          <MessagesBox messages={messages[activeChannel?.id]} />
          <div className="mt-auto px-5 py-3">
            <MessageForm channelId={activeChannel?.id} username={username} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBoard;
