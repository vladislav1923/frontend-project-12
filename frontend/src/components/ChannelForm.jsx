import {Field, Form, Formik} from "formik";
import {addMessage} from "../store/messagesSlice";
import {Form as BootstrapForm} from "react-bootstrap";
import {MessageButton} from "./index";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {closeModal} from "../store/channelsSlice";

function ChannelForm() {
    return (
        <Formik
            initialValues={{body: ''}}
            onSubmit={async (values) => {
                // dispatch(addMessage({ channelId, username, body: values.body }));
            }}
        >
            {({values}) => (
                <>
                    <Form>
                        <Modal.Body>
                            <BootstrapForm.Control
                                as={Field}
                                type="text"
                                name="name"
                                aria-label="Новое сообщение"
                                placeholder="Введите сообщение..."
                                className="border-0 p-0 ps-2 form-control"
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            {/*<Button variant="secondary" onClick={() => dispatch(closeModal())}>*/}
                            {/*    Close*/}
                            {/*</Button>*/}
                            {/*<Button variant="primary" onClick={() => dispatch(closeModal())}>*/}
                            {/*    Save Changes*/}
                            {/*</Button>*/}
                        </Modal.Footer>
                    </Form>
                </>
            )}
        </Formik>
    )
}

export default ChannelForm;
