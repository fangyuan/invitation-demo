import * as React from 'react';
import styles from './modal.scss';

declare interface ModalPropsType {
  children: React.ReactNode | React.ReactNodeArray;
  title: string;
  visible?: boolean;
  onClose: () => void;
}

const Modal = ({
  children,
  onClose,
  visible,
  title,
}: ModalPropsType): JSX.Element => {
  if (!visible) {
    return null;
  }

  return (
    <section className={styles.modalContainer}>
      <div className={styles.background} onClick={onClose} />
      <div className={styles.contentContainer}>
        <div className={styles.title}>
          <span>{title}</span>
          <span className={styles.line} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
};

export default Modal;
