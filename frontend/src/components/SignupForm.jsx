import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { FloatingLabel, Form as BootstrapForm, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { signup } from '../store/authSlice';

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isLoading = useSelector((state) => state.auth.requestState === 'pending');
  const isError = useSelector((state) => state.auth.requestState === 'failed');
  const errorCode = useSelector((state) => state.auth.errorCode);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [validationErrors, setValidationErrors] = useState({});

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('signupForm.usernameLengthValidationError'))
      .max(20, t('signupForm.usernameLengthValidationError'))
      .required(t('signupForm.usernameValidationError')),
    password: Yup.string()
      .min(6, t('signupForm.passwordLengthValidationError'))
      .max(20, t('signupForm.passwordLengthValidationError'))
      .required(t('signupForm.passwordValidationError')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('signupForm.passwordConfirmValidationError')),
  });

  const getErrorMessage = () => {
    switch (errorCode) {
      case 409:
        return t('signupForm.conflictRequestError');
      case 400:
        return t('signupForm.badRequestError');
      default:
        return t('signupForm.serverError');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="card shadow-sm">
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src="/signup.jpg" alt={t('signupForm.title')} className="rounded-circle" />
        </div>
        <Formik
          initialValues={{ username: '', password: '', confirmPassword: '' }}
          onSubmit={async (values) => {
            await validationSchema.validate(values, { abortEarly: false })
              .then(() => {
                setValidationErrors({});
                dispatch(signup({ username: values.username, password: values.password }));
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
              <h1 className="text-center mb-4">{t('signupForm.title')}</h1>
              {isError && <Alert variant="danger">{getErrorMessage()}</Alert>}
              <div className="mb-3">
                <FloatingLabel controlId="username" label={t('signupForm.usernamePlaceholder')}>
                  <BootstrapForm.Control
                    as={Field}
                    type="text"
                    name="username"
                    placeholder={t('signupForm.usernamePlaceholder')}
                    className="form-control"
                    isInvalid={!!validationErrors?.username}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {validationErrors?.username}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </div>
              <div className="mb-3">
                <FloatingLabel controlId="password" label={t('signupForm.passwordPlaceholder')}>
                  <BootstrapForm.Control
                    as={Field}
                    type="password"
                    name="password"
                    placeholder={t('signupForm.passwordPlaceholder')}
                    className="form-control"
                    isInvalid={!!validationErrors?.password}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {validationErrors?.password}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </div>
              <div className="mb-3">
                <FloatingLabel controlId="confirmPassword" label={t('signupForm.passwordConfirmPlaceholder')}>
                  <BootstrapForm.Control
                    as={Field}
                    type="password"
                    name="confirmPassword"
                    placeholder={t('signupForm.passwordConfirmPlaceholder')}
                    className="form-control"
                    isInvalid={!!validationErrors?.confirmPassword}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {validationErrors?.confirmPassword}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-100 mb-3 btn btn-outline-primary"
                >
                  {t('signupForm.buttonText')}
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
