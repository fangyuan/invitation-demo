import React from 'react';
import Modal from 'components/modal';
import styles from './inviteSuccessModal.scss';

declare interface Props {
  visible?: boolean;
  onClose: () => void;
}

const InviteSuccessModal = (props: Props): JSX.Element => {
  const { onClose, visible } = props;

  if (!visible) {
    return null;
  }

  return (
    <Modal title="All done!" onClose={onClose} visible>
      <div className={styles.content}>
        <div>You will be one of the first to experience Broccoli & Co. when we lancuh.</div>
        <button className="block" type="button" onClick={onClose}>OK</button>
      </div>
    </Modal>
  );
};

export default InviteSuccessModal;
