import React from 'react';
import styles from './welcomeContent.scss';

const Footer = (): JSX.Element => (
  <div className={styles.footer}>
    <div>
      <span>Made with</span>
      <span role="img" aria-label="love">
        ❤️
      </span>
      <span>in Melbourne.</span>
    </div>
    <div>
      <span role="img" aria-label="copyright">
        ©️
      </span>
      <span> 2020 Broccoli & Co. All Rights reserved.</span>
    </div>
  </div>
);

declare interface Props {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const WelcomeContent = ({ onClick }: Props): JSX.Element => (
  <div className={styles.page}>
    <div className={styles.header}> Broccoli & Co.</div>
    <div className={styles.mainContent}>
      <div className={styles.title}>
        <div>A better way</div>
        <div>to enjoy every day.</div>
      </div>
      <div className={styles.description}>
        Be the first to known when we launch.
      </div>
      <div>
        <button type="button" onClick={onClick}>
          Request an invite
        </button>
      </div>
    </div>
    <Footer />
  </div>
);

export default WelcomeContent;
