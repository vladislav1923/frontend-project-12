import {useEffect} from "react";
import { Formik, Form, Field } from "formik";
import { FloatingLabel, Form as BootstrapForm, Alert } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../store/authSlice";

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);

    return (
        <div className="card shadow-sm">
            <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="/login.png" alt="Войти" className="rounded-circle" />
                </div>
                <Formik
                    initialValues={{username: '', password: ''}}
                    onSubmit={async (values) => {
                        dispatch(login(values));
                    }}
                >
                    {() => (
                        <Form className="col-12 col-md-6 mt-3 mt-md-0">
                            <h1 className="text-center mb-4">Войти</h1>
                            {error && <Alert variant="danger">Неверные имя пользователя или пароль</Alert>}
                            <div className="mb-3">
                                <FloatingLabel label="Ваш ник">
                                    <BootstrapForm.Control
                                        as={Field}
                                        type="text"
                                        name="username"
                                        placeholder="Ваш ник"
                                        className="form-control"
                                        isInvalid={error}
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
                                        isInvalid={error}
                                    />
                                </FloatingLabel>
                            </div>
                            <div>
                                <button type="submit" disabled={isLoading} className="w-100 mb-3 btn btn-outline-primary">Войти</button>
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
