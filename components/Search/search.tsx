import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Paper, Text, Notification, TextInput } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

interface UserData {
    name: string;
    email: string;
    Location: string;
}

export default function UserProfile() {
    const [searchUsername, setSearchUsername] = useState('');
    const [userData, setUserData] = useState<UserData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/server/user', {
                
                    username: searchUsername

            });

            setUserData(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch user profile');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchUsername) {
            fetchUserProfile();
        } else {
            setUserData(null);
        }
    }, [searchUsername]);

    const goToPetProfile = () => {
        window.location.href = '/searchpet'; // Navigate to '/searchpet' route
    };

    return (
        <Paper style={{ padding: '20px', maxWidth: '600px', margin: 'auto', marginTop: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Text style={{ fontSize: '25px', fontWeight: 'bold' }}>User Profile</Text>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <TextInput
                    value={searchUsername}
                    onChange={(event) => setSearchUsername(event.target.value)}
                    placeholder="Enter username or Location"
                />
            </div>

            {loading && <p>Loading...</p>}
            {error && (
                <Notification
                    title="Error"
                    color="red"
                    icon={<IconX />}
                    onClose={() => setError(null)}
                >
                    {error}
                </Notification>
            )}
            
            {userData && (
                <div>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Location: {userData.Location}</p>
                </div>
            )}
            {/* Button to navigate to PetProfile component */}
            <div style={{ marginTop: '20px' }}>
                <Button onClick={goToPetProfile} color="blue">
                    Search Pet Profile
                </Button>
            </div>
        </Paper>
    );
}
