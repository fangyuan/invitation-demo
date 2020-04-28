import React from 'react';
import Modal from 'components/modal';

declare interface Props {
  visible?: boolean;
  onClose: () => void;
}

const InviteFormModal = (props: Props): JSX.Element => {
  const { onClose, visible } = props;

  if (!visible) {
    return null;
  }

  return (
    <Modal title="Request an invite" onClose={onClose} visible>
      <div>todo</div>
    </Modal>
  );
};

export default InviteFormModal;
