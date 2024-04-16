import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mantine/core';

export default function PetProfilePage() {
    const router = useRouter();

    const petData1 = {
        petName: 'Cole',
        petType: 'Dog',
        petBreed: 'German',
    };

    const petData2 = {
        petName: 'Tom',
        petType: 'Cat',
        petBreed: 'Persian',
    };

    const handleGoToUserProfile = () => {
        router.push('/profile'); // Change '/user-profile' to the actual route of your User Profile Page
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Pet Profile Page</h1>

            <div style={{ marginBottom: '20px' }}>
                <h2>Your Pet:</h2>
                <p><strong>Pet Name:</strong> {petData1.petName}</p>
                <p><strong>Pet Type:</strong> {petData1.petType}</p>
                <p><strong>Pet Breed:</strong> {petData1.petBreed}</p>
            </div>

            <div style={{ marginTop: '50px' }}>
                <h2>Your Pet:</h2>
                <p><strong>Pet Name:</strong> {petData2.petName}</p>
                <p><strong>Pet Type:</strong> {petData2.petType}</p>
                <p><strong>Pet Breed:</strong> {petData2.petBreed}</p>
            </div>

            <Button onClick={handleGoToUserProfile}>Go to User Profile Page</Button>
        </div>
    );
}
