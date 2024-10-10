import {useEffect, useRef} from "react";
import { Formik, Form, Field } from "formik";
import {useDispatch, useSelector} from "react-redux";
import {Form as BootstrapForm} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";
import {MessageButton} from "./";
import {addMessage} from "../store/messagesSlice";
import profanity from "../utils/leo-profanity";

function MessageForm({channelId, username}) {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const isRequestPending = useSelector((state) => state.messages.chat.requestState === 'pending');
    const isRequestSucceeded = useSelector((state) => state.messages.chat.requestState === 'succeeded');
    const isRequestFailed = useSelector((state) => state.messages.chat.requestState === 'failed');

    useEffect(() => {
        if (isRequestSucceeded) {
            ref.current.reset();
        }
    }, [isRequestSucceeded]);

    useEffect(() => {
        if (isRequestFailed) {
            toast.error(t('messageAddForm.errorToastText'));
        }
    }, [isRequestFailed]);

    return (
        <Formik
            initialValues={{body: ''}}
            onSubmit={async (values) => {
                dispatch(addMessage({ channelId, username, body: profanity.clean(values.body) }));
            }}
        >
            {({values}) => (
                <>
                    <Form ref={ref} className="py-1 border rounded-2">
                        <div className="input-group has-validation">
                            <BootstrapForm.Control
                                as={Field}
                                type="text"
                                name="body"
                                placeholder={t('messageAddForm.placeholder')}
                                className="border-0 p-0 ps-2 form-control"
                            />
                            <MessageButton disabled={!values.body || isRequestPending}/>
                        </div>
                    </Form>
                </>
            )}
        </Formik>
    )
}

export default MessageForm;
