import React, { useState } from 'react';
import { IconX, IconCheck } from '@tabler/icons-react';
import { Button, Container, Input, NavLink, Notification, rem } from '@mantine/core';
import Axios from 'axios'; // Import Axios library

export default function LoginPage() {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Please fill out all fields.');
      setShowFailure(true);
      return;
    }

    try {
      const response = await Axios.post('/server/login', { username, password }); // Using Axios for POST request

      if (response.status !== 200) {
        throw new Error('Failed to login');
      }

      setShowSuccess(true);
      setErrorMessage('');

      // Reset input fields
      setPassword('');
      window.location.href = '/homepage';
    } catch (error) {
      setErrorMessage('Invalid username or password.');
      setShowFailure(true);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      {showFailure && (
        <Notification
          icon={xIcon}
          color="red"
          title="Login failed"
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
          title="Login successful"
          onClose={() => setShowSuccess(false)}
          style={{ position: 'fixed', top: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}
        >
          Welcome back, {username}!
        </Notification>
      )}

      <Container size="md" style={{ maxWidth: '400px', marginTop: '50px' }}>
        <center>
          <h2>Login</h2>
          <form>
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
              onClick={handleLogin}
              variant="outline"
              color="teal"
              radius="xl"
            >
              Login
            </Button>
          </form>
        </center>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <NavLink href="/register" color="teal" variant='outline' active autoContrast label="Don't have an account? Register"/>
        </div>
      </Container>
    </div>
  );
}
