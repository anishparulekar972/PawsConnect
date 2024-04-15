import React from 'react';
import { Button, Group, Text } from '@mantine/core';

export default function HomePage() {
  const buttonStyles = {
    variant: "outline",
    color: "blue",
    style: {
      transition: 'background-color 0.3s',
      ':hover': {
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
      }
    }
  };

  const redirectToPosts = () => {
    window.location.href = '/posts';
  };

  const redirectToRegister = () => {
    window.location.href = '/test';
  };

  const redirectToLogin = () => {
    window.location.href = '/login';
  };

  const redirectToProfile = () => {
    window.location.href = '/manage';
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px' }}>
      <Text style={{ fontSize: '25px', fontWeight: 'bold' }}>PawsConnect</Text>
      <Group
        justify="flex-end"
        style={{
          borderRadius: '20px',
        }}
      >
        <Button {...buttonStyles} onClick={redirectToPosts}>Posts</Button>
        <Button {...buttonStyles} onClick={redirectToRegister}>Register</Button>
        <Button {...buttonStyles} onClick={redirectToLogin}>Login</Button>
        <Button {...buttonStyles} onClick={redirectToProfile}>Profile</Button>
      </Group>
    </div>
  );
}
