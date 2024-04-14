import React, { useState } from 'react';
import { IconX, IconCheck } from '@tabler/icons-react';
import { Button, Container, Input, NavLink, Notification, rem } from '@mantine/core';
import Axios from 'axios';

export default function CreatePetProfiles() {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddPetProfile = async () => {
    if (!petName || !petType || !petBreed) {
        setErrorMessage('Please fill out all fields.');
        setShowFailure(true);
        return;
      }
    
      try {
        const response = await Axios.post(`/server/addPetProfile`, {
          petName: petName,
          petType: petType,
          petBreed: petBreed,
        });
        if (response.status === 200) {
          setShowSuccess(true);
          setPetName('');
          setPetType('');
          setPetBreed('');
        }
      } catch (error) {
        console.log(error);
        setShowFailure(true);
        setErrorMessage('Failed to add pet profile.');
      }
    // Implement your logic to add a pet profile
  };

  const redirectToRemovePet = () => {
    window.location.href = '/removepet';
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      {showFailure && (
        <Notification
          icon={xIcon}
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
          icon={checkIcon}
          color="green"
          title="Pet Profile Created"
          onClose={() => setShowSuccess(false)}
          style={{ position: 'fixed', top: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}
        >
          Your pet profile has been created.
        </Notification>
      )}

      <Container size="md" style={{ maxWidth: '400px', marginTop: '50px' }}>
        <center>
          <h2>Create Pet Profiles</h2>
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
              onClick={handleAddPetProfile}
              variant="outline"
              color="teal"
              radius="xl"
            >
              Add Pet Profile
            </Button>
            <Button
              type="button"
              onClick={redirectToRemovePet}
              variant="outline"
              color="red"
              radius="xl"
            >
              Remove Pet
            </Button>
          </form>
        </center>
      </Container>
    </div>
  );
}