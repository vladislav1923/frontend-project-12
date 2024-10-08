import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Field, Form, Formik} from "formik";
import {Form as BootstrapForm} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {addChannel, closeModal, updateChannel} from "../store/channelsSlice";

function ChannelAddForm({id, currentName}) {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const isRequestPending = useSelector((state) => state.channels.modal.requestState === 'pending');
    const isRequestSucceeded = useSelector((state) => state.channels.modal.requestState === 'succeeded');

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, [ref]);

    useEffect(() => {
        if (isRequestSucceeded) {
            dispatch(closeModal());
        }
    }, [isRequestSucceeded]);

    return (
        <Formik
            initialValues={{name: currentName ?? ''}}
            onSubmit={async (values) => {
                if (currentName) {
                    dispatch(updateChannel({ id, name: values.name }));
                } else {
                    dispatch(addChannel({ name: values.name }));
                }
            }}
        >
            {({values}) => (
                <>
                    <Form>
                        <Modal.Header>
                            <Modal.Title>{currentName ? 'Переименовать' : 'Добавить'} канал</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Field name="name">
                                {({ field }) => (
                                    <BootstrapForm.Control
                                        {...field}
                                        type="text"
                                        ref={ref}
                                        className="form-control"
                                    />
                                )}
                            </Field>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => dispatch(closeModal())}>
                                Отменить
                            </Button>
                            <Button type="submit" variant="primary" disabled={!values.name || values.name === currentName || isRequestPending}>
                                Отправить
                            </Button>
                        </Modal.Footer>
                    </Form>
                </>
            )}
        </Formik>
    )
}

export default ChannelAddForm;
