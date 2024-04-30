import React, { useEffect, useState } from 'react';
import { Button, Group, Text } from '@mantine/core';
import axios from 'axios';

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
      <div style={{ textAlign: "center" }}>
        {posts.map((post) => (
          <div key={post.post_id}>
            <p>{post.post_content}, {post.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
