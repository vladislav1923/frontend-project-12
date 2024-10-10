import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../store/channelsSlice';
import ChannelAddForm from './ChannelAddForm';
import ChannelRemoveForm from './ChannelRemoveForm';

const ChannelModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.channels.modal.isOpen);
  const type = useSelector((state) => state.channels.modal.type);
  const name = useSelector((state) => state.channels.modal.name);
  const id = useSelector((state) => state.channels.modal.id);

  const getModalContent = () => {
    switch (type) {
      case 'add':
        return <ChannelAddForm />;
      case 'rename':
        return <ChannelAddForm id={id} currentName={name} />;
      case 'remove':
        return <ChannelRemoveForm id={id} />;
      default:
        return null;
    }
  };

  return (
    <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
      {getModalContent()}
    </Modal>
  );
};

export default ChannelModal;
