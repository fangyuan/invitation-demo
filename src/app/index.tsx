import React, { useState } from 'react';
import InviteFormModal from 'app/inviteFormModal';
import WelcomeContent from 'app/welcomeContent';
import InviteSuccessModal from 'app/intivteSuccessModal';

const App = (): JSX.Element => {
  const [showForm, setShowForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <>
      <WelcomeContent
        onClick={(): void => setShowForm(true)}
      />
      <InviteFormModal
        onSuccess={(): void => {
          setShowForm(false);
          setShowSuccessModal(true);
        }}
        visible={showForm}
      />
      <InviteSuccessModal
        visible={showSuccessModal}
        onClose={(): void => setShowSuccessModal(false)}
      />
    </>
  );
};

export default App;
