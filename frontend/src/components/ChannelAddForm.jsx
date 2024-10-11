import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { Form as BootstrapForm } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import { addChannel, closeModal, renameChannel } from '../store/channelsSlice';
import profanity from '../utils/leo-profanity';

const ChannelAddForm = ({ id, currentName }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isRequestPending = useSelector((state) => state.channels.modal.requestState === 'pending');
  const isRequestSucceeded = useSelector((state) => state.channels.modal.requestState === 'succeeded');
  const isRequestFailed = useSelector((state) => state.channels.modal.requestState === 'failed');
  const [validationErrors, setValidationErrors] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('channelAddForm.lengthValidationError'))
      .max(20, t('channelAddForm.lengthValidationError'))
      .required(t('channelAddForm.validationError')),
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  useEffect(() => {
    if (isRequestSucceeded) {
      dispatch(closeModal());
      toast.success(
        currentName ? t('channelAddForm.renameToastText') : t('channelAddForm.toastText'),
      );
    }
  }, [isRequestSucceeded, dispatch, t, currentName]);

  useEffect(() => {
    if (isRequestFailed) {
      toast.error(
        currentName ? t('channelAddForm.errorRenameToastText') : t('channelAddForm.errorToastText'),
      );
    }
  }, [isRequestFailed, t, currentName]);

  return (
    <Formik
      initialValues={{ name: currentName ?? '' }}
      onSubmit={async (values) => {
        await validationSchema.validate(values, { abortEarly: false })
          .then(() => {
            if (currentName) {
              dispatch(renameChannel({ id, name: profanity.clean(values.name) }));
            } else {
              dispatch(addChannel({ name: profanity.clean(values.name) }));
            }
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
      {({ values }) => (
        <Form>
          <Modal.Header>
            <Modal.Title>
              {currentName ? t('channelAddForm.renameTitle') : t('channelAddForm.title')}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Field name="name">
              {({ field }) => (
                <>
                  <BootstrapForm.Group>
                    <BootstrapForm.Label htmlFor="name" visuallyHidden>{t('channelAddForm.labelText')}</BootstrapForm.Label>
                    <BootstrapForm.Control
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      id="name"
                      type="text"
                      ref={ref}
                      className="form-control"
                      isInvalid={!!validationErrors?.name}
                    />
                  </BootstrapForm.Group>
                  <BootstrapForm.Control.Feedback type="invalid">
                    {validationErrors?.name}
                  </BootstrapForm.Control.Feedback>
                </>
              )}
            </Field>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch(closeModal())}>
              {t('channelAddForm.cancelButtonText')}
            </Button>
            <Button type="submit" variant="primary" disabled={values.name === currentName || isRequestPending}>
              {t('channelAddForm.buttonText')}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
};

export default ChannelAddForm;
