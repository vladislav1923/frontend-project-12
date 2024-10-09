import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Field, Form, Formik} from "formik";
import {Form as BootstrapForm} from "react-bootstrap";
import { toast } from 'react-toastify';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {addChannel, closeModal, renameChannel} from "../store/channelsSlice";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .required('Обязательное поле'),
});


function ChannelAddForm({id, currentName}) {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const isRequestPending = useSelector((state) => state.channels.modal.requestState === 'pending');
    const isRequestSucceeded = useSelector((state) => state.channels.modal.requestState === 'succeeded');
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, [ref]);

    useEffect(() => {
        if (isRequestSucceeded) {
            dispatch(closeModal());
            toast.success(`Канал ${currentName ? 'переименован' : 'успешно добавлен'}`);
        }
    }, [isRequestSucceeded]);

    return (
        <Formik
            initialValues={{name: currentName ?? ''}}
            onSubmit={async (values) => {
                await validationSchema.validate(values, {abortEarly: false})
                    .then(() => {
                        if (currentName) {
                            dispatch(renameChannel({ id, name: values.name }));
                        } else {
                            dispatch(addChannel({ name: values.name }));
                        }
                    })
                    .catch((e) => {
                        const errors = {};
                        e.inner.forEach(error => {
                            errors[error.path] = error.message;
                        });
                        setValidationErrors(errors);
                    });
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
                                    <>
                                        <BootstrapForm.Control
                                            {...field}
                                            type="text"
                                            ref={ref}
                                            className="form-control"
                                            isInvalid={!!validationErrors?.name}
                                        />
                                        <BootstrapForm.Control.Feedback type="invalid">
                                            {validationErrors?.name}
                                        </BootstrapForm.Control.Feedback>
                                    </>
                                )}
                            </Field>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => dispatch(closeModal())}>
                                Отменить
                            </Button>
                            <Button type="submit" variant="primary" disabled={values.name === currentName || isRequestPending}>
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
