import {useEffect, useState} from "react";
import { Formik, Form, Field } from "formik";
import { FloatingLabel, Form as BootstrapForm, Alert } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {signup} from "../store/authSlice";

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Имя пользователя обязательно'),
    password: Yup.string().required('Пароль обязателен'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
});

function SignupForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.auth.requestState === 'pending');
    const isError = useSelector((state) => state.auth.requestState === 'failed');
    const errorMessage = useSelector((state) => state.auth.errorMessage);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);

    return (
        <div className="card shadow-sm">
            <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="/signup.jpg" alt="Регистрация" className="rounded-circle" />
                </div>
                <Formik
                    initialValues={{username: '', password: '', confirmPassword: ''}}
                    onSubmit={async (values) => {
                        await validationSchema.validate(values, {abortEarly: false})
                            .then(() => {
                                setValidationErrors({});
                                dispatch(signup({ username: values.username, password: values.password }));
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
                    {() => (
                        <Form className="col-12 col-md-6 mt-3 mt-md-0">
                            <h1 className="text-center mb-4">Регистрация</h1>
                            {isError && <Alert variant="danger">{errorMessage}</Alert>}
                            <div className="mb-3">
                                <FloatingLabel label="Имя пользователя">
                                    <BootstrapForm.Control
                                        as={Field}
                                        type="text"
                                        name="username"
                                        placeholder="Имя пользователя"
                                        className="form-control"
                                        isInvalid={!!validationErrors?.username}
                                    />
                                    <BootstrapForm.Control.Feedback type="invalid">
                                        {validationErrors?.username}
                                    </BootstrapForm.Control.Feedback>
                                </FloatingLabel>
                            </div>
                            <div className="mb-3">
                                <FloatingLabel label="Пароль">
                                    <BootstrapForm.Control
                                        as={Field}
                                        type="password"
                                        name="password"
                                        placeholder="Пароль"
                                        className="form-control"
                                        isInvalid={!!validationErrors?.password}
                                    />
                                    <BootstrapForm.Control.Feedback type="invalid">
                                        {validationErrors?.password}
                                    </BootstrapForm.Control.Feedback>
                                </FloatingLabel>
                            </div>
                            <div className="mb-3">
                                <FloatingLabel label="Подтвердите пароль">
                                    <BootstrapForm.Control
                                        as={Field}
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Подтвердите пароль"
                                        className="form-control"
                                        isInvalid={!!validationErrors?.confirmPassword}
                                    />
                                    <BootstrapForm.Control.Feedback type="invalid">
                                        {validationErrors?.confirmPassword}
                                    </BootstrapForm.Control.Feedback>
                                </FloatingLabel>
                            </div>
                            <div>
                                <button type="submit" disabled={isLoading}
                                        className="w-100 mb-3 btn btn-outline-primary">
                                    Зарегистрироваться
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SignupForm;
