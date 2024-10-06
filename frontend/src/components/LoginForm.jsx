import { Formik, Form, Field } from "formik";
import { FloatingLabel, Form as BootstrapForm, Button } from "react-bootstrap";

function LoginForm() {
    return (
        <div className="card shadow-sm">
            <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="/login.png" alt="Войти" className="rounded-circle" />
                </div>
                <Formik
                    initialValues={{username: null, password: ""}}
                    onSubmit={({setSubmitting}) => {
                        console.log("Form is validated! Submitting the form...");
                        setSubmitting(false);
                    }}
                >
                    {() => (
                        <Form className="col-12 col-md-6 mt-3 mt-md-0">
                            <h1 className="text-center mb-4">Войти</h1>
                            <div className="mb-3">
                                <FloatingLabel label="Ваш ник">
                                    <BootstrapForm.Control
                                        as={Field}
                                        type="text"
                                        name="username"
                                        placeholder="Ваш ник"
                                        className="form-control"
                                    />
                                </FloatingLabel>
                            </div>
                            <div className="mb-3">
                                <FloatingLabel label="Пароль">
                                    <BootstrapForm.Control
                                        as={Field}
                                        type="text"
                                        name="password"
                                        placeholder="Пароль"
                                        className="form-control"
                                    />
                                </FloatingLabel>
                            </div>
                            <div>
                                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="card-footer p-4">
                <div className="text-center">
                    <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
