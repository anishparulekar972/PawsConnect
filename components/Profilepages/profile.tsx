import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mantine/core';

export default function profile() {
    const router = useRouter();

    const userData = {
        name: 'Ibrahim',
        username: 'IbrahimCheena',
        email: 'icheena@csumb.edu',
    };

    const handleGoToPetProfile = () => {
        router.push('/petprofile'); // Change '/pet-profile' to the actual route of your Pet Profile Page
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>User Profile Page</h1>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <Button onClick={handleGoToPetProfile}>Go to Pet Profile Page</Button>
        </div>
    );
}
