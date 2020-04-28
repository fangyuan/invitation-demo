import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Modal from 'components/modal';
import styles from './inviteFormModal.scss';

declare interface Props {
  visible?: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

declare interface FormField {
  value: string;
  hasError?: boolean;
}

declare interface FormData {
  name: FormField;
  email: FormField;
  confirmEmail: FormField;
}

const sendRequest = (data: {
  name: string;
  email: string;
}): Promise<AxiosResponse> => axios.post(
  'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
  data,
);

const InviteFormModal = (props: Props): JSX.Element => {
  const { onClose, onSuccess, visible } = props;
  const [formData, setFormData] = useState<FormData>({
    name: { value: '' },
    email: { value: '' },
    confirmEmail: { value: '' },
  });
  const [isSending, setIsSending] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onFormFieldChange = (name: keyof FormData, value: string): void => {
    setFormData({
      ...formData,
      [name]: {
        hasError: false,
        value,
      },
    });
  };

  const onSubmit = (
    e: React.FormEvent | React.MouseEvent<HTMLElement>,
  ): void => {
    if (isSending) {
      return;
    }

    if (
      !formData.name.value
      || !formData.email.value
      || !formData.confirmEmail.value
    ) {
      return;
    }

    if (formData.confirmEmail.value !== formData.email.value) {
      setFormData({
        ...formData,
        confirmEmail: {
          ...formData.confirmEmail,
          hasError: true,
        },
      });
      return;
    }

    setIsSending(true);
    sendRequest({
      name: formData.name.value,
      email: formData.email.value,
    })
      .then(() => {
        setIsSending(false);
        onSuccess();
      })
      .catch((err: AxiosError) => {
        setError(err.response?.data?.errorMessage || err.message);
        setIsSending(false);
      });

    e.preventDefault();
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal title="Request an invite" onClose={onClose} visible>
      <form onSubmit={onSubmit} method="POST" className={styles.form}>
        <input
          type="text"
          name="name"
          value={formData.name.value}
          onChange={(e): void => {
            e.persist();
            onFormFieldChange('name', e.target.value);
          }}
          className={formData.name?.hasError ? 'error' : ''}
          placeholder="Name"
          required
          minLength={3}
        />
        <input
          type="email"
          name="email"
          value={formData?.email?.value}
          onChange={(e): void => onFormFieldChange('email', e.target.value)}
          className={formData.email?.hasError ? 'error' : ''}
          placeholder="Email"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.confirmEmail?.value}
          onChange={(e): void => onFormFieldChange('confirmEmail', e.target.value)}
          className={formData.confirmEmail?.hasError ? 'error' : ''}
          placeholder="Confirm Email"
          required
        />

        <button type="submit" className="block" onClick={onSubmit}>
          {isSending ? 'Sending, please wait' : 'Send'}
        </button>

        {error && <div>{error}</div>}
      </form>
    </Modal>
  );
};

export default InviteFormModal;
