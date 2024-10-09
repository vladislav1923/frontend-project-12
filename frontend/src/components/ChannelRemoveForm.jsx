import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Form, useFormik} from "formik";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {closeModal, removeChannel} from "../store/channelsSlice";
import {toast} from "react-toastify";

function ChannelRemoveForm({id}) {
    const dispatch = useDispatch();
    const isRequestPending = useSelector((state) => state.channels.modal.requestState === 'pending');
    const isRequestSucceeded = useSelector((state) => state.channels.modal.requestState === 'succeeded');
    const formik = useFormik({
        initialValues: {},
        onSubmit: () => {
            dispatch(removeChannel({ id }));
        },
    });

    useEffect(() => {
        if (isRequestSucceeded) {
            dispatch(closeModal());
            toast.success('Канал удален');
        }
    }, [isRequestSucceeded]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Modal.Header>
                <Modal.Title>Удалить канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Уверены?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => dispatch(closeModal())}>
                    Отменить
                </Button>
                <Button type="submit" variant="danger" disabled={isRequestPending}>
                    Удалить
                </Button>
            </Modal.Footer>
        </form>
    )
}

export default ChannelRemoveForm;
