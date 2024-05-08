import React, { useEffect, useState } from 'react';
import { Button, Group, Text, Select } from '@mantine/core';
import axios from 'axios';
const { v4: uuidv4 } = require('uuid');
import moment from 'moment-timezone';

const key = "1696da1db69b4b269d0fc2757b22fb03";
const endpoint = "https://api.cognitive.microsofttranslator.com";
const location = "westus2";


const formatDate = (dateString: string) => {
  // Assuming the dateString is in UTC format
  const formattedDate = moment.utc(dateString).local().format('YYYY-MM-DD HH:mm:ss');
  return formattedDate;
};

interface Post {
  post_id: number;
  post_content: string;
  created_at: string;
  // Add more properties if needed
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts from backend when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts from backend
  const fetchPosts = async () => {
    try {
      const response = await axios.post('/server/getPosts');
      if (response.status===200) {
        setPosts(response.data.posts);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };




  // Render translate button for each post
  const translatePostContent = async (postId: number, language: string) => {
    try {
      const response = await axios.post('/server/translateText', { postId: postId, language: language });
        
        if (response.status === 200) {
            const translatedContent = response.data.translatedContent;
            // Update the translated content in the state
            const translatedPosts = posts.map(post => {
                if (post.post_id === postId) {
                    return { ...post, post_content: translatedContent };
                }
                return post;
            });
            setPosts(translatedPosts);
        } else {
            console.error('Failed to translate post content');
        }
    } catch (error) {
        console.error('Error translating post content:', error);
    }
};

  const redirectToCreatePost = () => {
    window.location.href = '/createpost';
  };

  const redirectToRegister = () => {
    window.location.href = '/test';
  };

  const redirectToLogin = () => {
    window.location.href = '/login';
  };

  const redirectToProfile = () => {
    window.location.href = '/profile';
  };

  const redirectToManage = () => {
    window.location.href = '/manage';
  };

  const redirectToCreatePetProfile = () => {
    window.location.href = '/createpet';
  };

  const redirectTOSearch = () => {
    window.location.href = '/search';
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px' }}>
        <Text style={{ fontSize: '25px', fontWeight: 'bold' }}>PawsConnect</Text>
        <Group
          justify="flex-end"
          style={{
            borderRadius: '20px',
          }}
        >
          <Button variant="outline" color="blue" onClick={redirectToCreatePost}>
            Create Post
          </Button>
          <Button variant="outline" color="blue" onClick={redirectToRegister}>
            Register
          </Button>
          <Button variant="outline" color="blue" onClick={redirectToLogin}>
            Login
          </Button>
          <Button variant="outline" color="blue" onClick={redirectToCreatePetProfile}>
            Create Pet Profile
          </Button>
          <Button variant="outline" color="blue" onClick={redirectToProfile}>
            Profile
          </Button>
          <Button variant="outline" color="blue" onClick={redirectToManage}>
            Manage
          </Button>
          <Button variant="outline" color="blue" onClick={redirectTOSearch}>
            Search
          </Button>
        </Group>
      </div>
      {/* Display posts */}
<div style={{ textAlign: "center", borderTop: "1px solid #ccc", padding: "40px" }}>
  {posts.map((post) => (
    <div key={post.post_id}>
      <p>
        Caption: {post.post_content}
        <br />
        Posted on: {formatDate(post.created_at)}
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Select
            placeholder="Translate to"
            data={[
              { value: 'hi', label: 'Hindi' },
              { value: 'fr', label: 'French' },
              { value: 'de', label: 'German' },
              { value: 'ar', label: 'Arabic' },
              { value: 'es', label: 'Spanish' },
              { value: 'it', label: 'Italian' },
              { value: 'ja', label: 'Japanese' },
              { value: 'ko', label: 'Korean' },
              { value: 'pt', label: 'Portuguese' },
              { value: 'ru', label: 'Russian' },
              { value: 'zh', label: 'Chinese' },
              { value: 'tr', label: 'Turkish' },
              { value: 'pl', label: 'Polish' },
              { value: 'ro', label: 'Romanian' },
              { value: 'vi', label: 'Vietnamese' },
              { value: 'uk', label: 'Ukrainian' },
              { value: 'th', label: 'Thai' },
              { value: 'id', label: 'Indonesian' },
              { value: 'nl', label: 'Dutch' },
              { value: 'sv', label: 'Swedish' },
              { value: 'en', label: 'English' },
              // Add more languages if needed
            ]}
            onChange={(value) => translatePostContent(post.post_id, value)}
            style={{ width: '200px', backgroundColor: '#cce5ff' }}
          />
        </div>
      </p>
    </div>
  ))}
</div>


    </div>
  );
}
