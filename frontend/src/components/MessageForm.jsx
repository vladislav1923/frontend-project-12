import { Formik, Form, Field } from "formik";
import {useDispatch, useSelector} from "react-redux";
import {Form as BootstrapForm} from "react-bootstrap";
import {MessageButton} from "./";
import {addMessage} from "../store/messagesSlice";

function MessageForm({channelId, username}) {
    const dispatch = useDispatch();
    const isMessageAdding = useSelector((state) => state.messages.chat.requestState === 'pending');

    return (
        <Formik
            initialValues={{body: ''}}
            onSubmit={async (values, { resetForm }) => {
                dispatch(addMessage({ channelId, username, body: values.body }));
                resetForm();
            }}
        >
            {({values}) => (
                <>
                    <Form className="py-1 border rounded-2">
                        <div className="input-group has-validation">
                            <BootstrapForm.Control
                                as={Field}
                                type="text"
                                name="body"
                                aria-label="Новое сообщение"
                                placeholder="Введите сообщение..."
                                className="border-0 p-0 ps-2 form-control"
                            />
                            <MessageButton disabled={!values.body || isMessageAdding}/>
                        </div>
                    </Form>
                </>
            )}
        </Formik>
    )
}

export default MessageForm;
