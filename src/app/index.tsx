import React, { useState } from 'react';
import InviteFormModal from 'app/inviteFormModal';
import WelcomeContent from 'app/welcomeContent';
import InviteSuccessModal from 'app/intivteSuccessModal';

const App = (): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>();
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>();

  return (
    <>
      <WelcomeContent onClick={(): void => setShowForm(true)} />
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
