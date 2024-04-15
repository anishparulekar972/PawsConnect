import React, { useState } from 'react';
import Axios from 'axios';
import { Button, Container, Input, Notification, rem } from '@mantine/core';

export default function RemovePet() {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDeletePet = async () => {
    if (!petName || !petType || !petBreed) {
      setErrorMessage('Please fill out all fields.');
      setShowFailure(true);
      return;
    }

    try {
      const response = await Axios.delete(`/server/removePetProfile`, {
        data: {petName, petType, petBreed }
      });
      if (response.status === 200) {
        setShowSuccess(true);
        setPetName('');
        setPetType('');
        setPetBreed('');
      }
    } catch (error) {
      setShowFailure(true);
      setErrorMessage('Failed to delete pet profile.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      {showFailure && (
        <Notification
          color="red"
          title="Operation failed"
          onClose={() => setShowFailure(false)}
          style={{ position: 'fixed', top: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}
        >
          {errorMessage}
        </Notification>
      )}
      {showSuccess && (
        <Notification
          color="green"
          title="Pet Profile Deleted"
          onClose={() => setShowSuccess(false)}
          style={{ position: 'fixed', top: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}
        >
          Pet profile has been deleted.
        </Notification>
      )}

      <Container size="md" style={{ maxWidth: '400px', marginTop: '50px' }}>
        <center>
          <h2>Delete Pet Profile</h2>
          <form>
            <div style={{ marginBottom: '1rem' }}>
              <Input
                value={petName}
                onChange={(event) => setPetName(event.target.value)}
                placeholder="Pet Name"
                required
                size="lg"
                style={{ borderColor: '#ccc' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Input
                value={petType}
                onChange={(event) => setPetType(event.target.value)}
                placeholder="Pet Type"
                required
                size="lg"
                style={{ borderColor: '#ccc' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Input
                value={petBreed}
                onChange={(event) => setPetBreed(event.target.value)}
                placeholder="Pet Breed"
                required
                size="lg"
                style={{ borderColor: '#ccc' }}
              />
            </div>
            <Button
              type="button"
              onClick={handleDeletePet}
              variant="outline"
              color="red"
              radius="xl"
            >
              Delete Pet Profile
            </Button>
          </form>
        </center>
      </Container>
    </div>
  );
}
