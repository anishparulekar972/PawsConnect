import React, { useState } from 'react';
import { IconX, IconCheck } from '@tabler/icons-react';
import { Button, Container, Input, NavLink, Notification, rem } from '@mantine/core';
import Axios from 'axios';

export default function RegisterPage() {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (!name || !username || !email || !password) {
      setErrorMessage('Please fill out all fields.');
      setShowFailure(true);
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Invalid email format.');
      setShowFailure(true);
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      setShowFailure(true);
      return;
    }

    try {
      const response = await Axios.post(`/server/register`, {
        name: name,
        username: username,
        email: email,
        password: password,
      });
      if (response.status === 200) {
        setShowSuccess(true);
        setName('');
        setUsername('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      {showFailure && (
        <Notification
          icon={xIcon}
          color="red"
          title="Registration failed"
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
          title="Registration successful"
          onClose={() => setShowSuccess(false)}
          style={{ position: 'fixed', top: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}
        >
          You can now log in with your new account.
        </Notification>
      )}

      <Container size="md" style={{ maxWidth: '400px', marginTop: '50px' }}>
        <center>
          <h2>Register</h2>
          <form>
            <div style={{ marginBottom: '1rem' }}>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Name"
                required
                size="lg"
                style={{ borderColor: '#ccc' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
                required
                size="lg"
                style={{ borderColor: '#ccc' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Email"
                required
                size="lg"
                style={{ borderColor: '#ccc' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
                required
                size="lg"
                style={{ borderColor: '#ccc' }}
              />
            </div>
            <Button
              type="button"
              onClick={handleRegister}
              variant="outline"
              color="teal"
              radius="xl"
            >
              Register
            </Button>
          </form>
        </center>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <NavLink href="/login" color="teal" variant='outline' active autoContrast label="Already have an account? Login here!" />
        </div>
      </Container>
    </div>
  );
}
