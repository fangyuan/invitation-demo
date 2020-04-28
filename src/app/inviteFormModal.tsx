import React, { useState } from 'react';
import Modal from 'components/modal';

declare interface Props {
  visible?: boolean;
  onClose: () => void;
}

declare interface FormField {
  value: string;
  hasError?: boolean;
}

declare interface FormData {
  name?: FormField;
  email?: FormField;
  confirmEmail?: FormField;
}

const InviteFormModal = (props: Props): JSX.Element => {
  const { visible } = props;
  const [formData, setFormData] = useState<FormData>({});
  const [isSending, setIsSending] = useState(false);

  const onFormFieldChange = (name: keyof FormData, value: string): void => {
    setFormData({
      ...formData,
      [name]: {
        hasError: false,
        value,
      },
    });
  };

  const onSubmit = (): void => {
    if (isSending) {
      return;
    }

    /* browser form will help validate input field value */
    if (formData?.confirmEmail?.value !== formData?.email?.value) {
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
  };

  const noops = (): void => {
    // do nothing
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal title="Request an invite" onClose={noops} visible>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={formData?.name?.value}
          onChange={(e): void => onFormFieldChange('name', e.target.value)}
          placeholder="Name"
          required
          minLength={3}
        />
        <input
          type="email"
          name="email"
          value={formData?.email?.value}
          onChange={(e): void => onFormFieldChange('email', e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="email"
          name="email"
          value={formData?.confirmEmail?.value}
          onChange={(e): void => onFormFieldChange('confirmEmail', e.target.value)}
          placeholder="Confirm Email"
          required
        />

        <button
          type="submit"
          className="block"
          onClick={onSubmit}
        >
          {isSending ? 'Sending, please wait' : 'Send'}
        </button>
      </form>
    </Modal>
  );
};

export default InviteFormModal;
