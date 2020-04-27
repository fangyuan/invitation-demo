import * as React from 'react';
import styles from './modal.scss';

export interface ModalWrapperPropsType {
  show?: boolean;
  onClose: () => void;
}

declare interface ModalPropsType extends ModalWrapperPropsType {
  title: string;
  children: React.ReactNode | React.ReactNodeArray;
}

const Modal = ({
  children,
  onClose,
  show,
  title,
}: ModalPropsType): JSX.Element => {
  if (!show) {
    return null;
  }

  return (
    <section className={styles.modalContainer}>
      <div className={styles.background} onClick={onClose} />
      <div className={styles.contentContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{children}</div>
        <div className={styles.btnContainer}>
          <button
            type="button"
            className={styles.btnCloseModal}
            onClick={onClose}
          >
            close
          </button>
        </div>
      </div>
    </section>
  );
};

export default Modal;
