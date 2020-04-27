import React from 'react';

const Footer = (): JSX.Element => (
  <div className="footer">
    <div>
      <span>Made with</span>
      <span role="img" aria-label="love">❤️</span>
      <span>in Melbourne.</span>
    </div>
    <div>
      <span role="img" aria-label="copyright">©️</span>
      <span> 2020 Broccoli & Co. All Rights reserved.</span>
    </div>
  </div>
);

const WelcomeContent = (): JSX.Element => (
  <>
    <div className="header"> Broccoli & Co.</div>
    <div className="content">todo</div>
    <Footer />
  </>
);

export default WelcomeContent;
