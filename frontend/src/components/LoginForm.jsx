import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import { FloatingLabel, Form as BootstrapForm, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { login } from '../store/authSlice';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isLoading = useSelector((state) => state.auth.requestState === 'pending');
  const isError = useSelector((state) => state.auth.requestState === 'failed');
  const errorCode = useSelector((state) => state.auth.errorCode);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [validationErrors, setValidationErrors] = useState({});

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('loginForm.usernameValidationError')),
    password: Yup.string().required(t('loginForm.passwordValidationError')),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="card shadow-sm">
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src="/login.png" alt={t('loginForm.title')} className="rounded-circle" />
        </div>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={async (values) => {
            await validationSchema.validate(values, { abortEarly: false })
              .then(() => {
                setValidationErrors({});
                dispatch(login(values));
              })
              .catch((e) => {
                const errors = {};
                e.inner.forEach((error) => {
                  errors[error.path] = error.message;
                });
                setValidationErrors(errors);
              });
          }}
        >
          {() => (
            <Form className="col-12 col-md-6 mt-3 mt-md-0">
              <h1 className="text-center mb-4">{t('loginForm.title')}</h1>
              {isError && <Alert variant="danger">{errorCode === 400 ? t('signupForm.badRequestError') : t('signupForm.serverError')}</Alert>}
              <div className="mb-3">
                <FloatingLabel label={t('loginForm.usernamePlaceholder')}>
                  <BootstrapForm.Control
                    as={Field}
                    type="text"
                    name="username"
                    placeholder={t('loginForm.usernamePlaceholder')}
                    className="form-control"
                    isInvalid={!!validationErrors?.username}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {validationErrors?.username}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </div>
              <div className="mb-3">
                <FloatingLabel label={t('loginForm.passwordPlaceholder')}>
                  <BootstrapForm.Control
                    as={Field}
                    type="password"
                    name="password"
                    placeholder={t('loginForm.passwordPlaceholder')}
                    className="form-control"
                    isInvalid={!!validationErrors?.password}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {validationErrors?.password}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-100 mb-3 btn btn-outline-primary"
                >
                  {t('loginForm.title')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>{t('loginForm.noAccountText')}</span>
          {' '}
          <a href="/signup">{t('loginForm.signupText')}</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
