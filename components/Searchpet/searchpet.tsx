import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Paper, Text, Notification, TextInput } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

interface PetData {
    petName: string;
    petType: string;
    petBreed: string;
}

export default function PetProfile() {
    const [searchPetName, setSearchPetName] = useState('');
    const [petData, setPetData] = useState<PetData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchPetProfile = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/server/pet_profiles', {
                petName: searchPetName
            });

            setPetData(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch pet profile');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchPetName) {
            fetchPetProfile();
        } else {
            setPetData(null);
        }
    }, [searchPetName]);

    return (
        <Paper style={{ padding: '20px', maxWidth: '600px', margin: 'auto', marginTop: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Text style={{ fontSize: '25px', fontWeight: 'bold' }}>Pet Profile</Text>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <TextInput
                    value={searchPetName}
                    onChange={(event) => setSearchPetName(event.target.value)}
                    placeholder="Enter pet name"
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
            
            {petData && (
                <div>
                    <p>Pet Name: {petData.pet_name}</p>
                    <p>Pet Type: {petData.pet_type}</p>
                    <p>Pet Breed: {petData.pet_breed}</p>
                </div>
            )}
        </Paper>
    );
}
