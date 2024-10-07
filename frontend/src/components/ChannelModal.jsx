import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../store/channelsSlice";

function ChannelModal() {
    const dispatch = useDispatch();
    const isOpenModal = useSelector((state) => state.channels.isOpenModal);

    return (
        <Modal show={isOpenModal} onHide={() => dispatch(closeModal())}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить канал</Modal.Title>
            </Modal.Header>

        </Modal>
    );
}

export default ChannelModal;
