import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {closeModal, removeChannel} from "../store/channelsSlice";

function ChannelRemoveForm({id}) {
    const dispatch = useDispatch();
    const {t} = useTranslation();
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
            toast.success(t('channelRemoveForm.toastText'));
        }
    }, [isRequestSucceeded]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Modal.Header>
                <Modal.Title>{t('channelRemoveForm.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {t('channelRemoveForm.bodyText')}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => dispatch(closeModal())}>
                    {t('channelRemoveForm.cancelButtonText')}
                </Button>
                <Button type="submit" variant="danger" disabled={isRequestPending}>
                    {t('channelRemoveForm.buttonText')}
                </Button>
            </Modal.Footer>
        </form>
    )
}

export default ChannelRemoveForm;
