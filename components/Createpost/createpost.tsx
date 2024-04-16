import React, { useState } from 'react';
import { IconX, IconCheck } from '@tabler/icons-react';
import { Button, Paper, TextInput, Checkbox, Notification, rem, Text } from '@mantine/core';
import Axios from 'axios'; // Import Axios library

export default function CreatePost(){
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const [postContent, setPostContent] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreatePost = async () => {
    if (!postContent) {
      setErrorMessage('Post content cannot be empty.');
      setShowFailure(true);
      return;
    }

    try {
      const response = await Axios.post('/server/createPost', { postContent, visibility }); // Using Axios for POST request

      if (response.status !== 200) {
        throw new Error('Failed to create post');
      }

      setShowSuccess(true);
      setErrorMessage('');

      // Reset input fields
      setPostContent('');
    } catch (error) {
      setErrorMessage('Failed to create post. Please try again later.');
      setShowFailure(true);
    }
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '600px', margin: 'auto', marginTop: '50px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Text style={{ fontSize: '25px', fontWeight: 'bold' }}>Create Post</Text>
      </div>
      {showFailure && (
        <Notification
          icon={xIcon}
          color="red"
          title="Failed to create post"
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
          title="Post created successfully"
          onClose={() => setShowSuccess(false)}
          style={{ position: 'fixed', top: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}
        >
          Your post has been created successfully.
        </Notification>
      )}

      <div style={{ marginBottom: '20px' }}>
        <TextInput
          value={postContent}
          onChange={(event) => setPostContent(event.target.value)}
          placeholder="Write something about your pet..."
        />
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <Checkbox
          label="Friends Only"
          checked={visibility === 'friendsOnly'}
          onChange={() => setVisibility('friendsOnly')}
        />
        <Checkbox
          label="Public"
          checked={visibility === 'public'}
          onChange={() => setVisibility('public')}
          style={{ marginLeft: '20px' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleCreatePost} variant="outline" color="blue">
          Create Post
        </Button>
      </div>
    </Paper>
  );
};
