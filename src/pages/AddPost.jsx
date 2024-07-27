import React, { useState, useEffect } from 'react';
import { Container, PostForm } from '../componets'; // Ensure the path is correct
import { FaSpinner } from 'react-icons/fa'; // Importing a spinner icon

function AddPost() {
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Simulate an async operation like fetching data or loading resources
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Simulating a 1-second delay

        return () => clearTimeout(timer); // Clean up the timer
    }, []);

    return (
        <div className='py-8 min-h-screen flex items-center justify-center'>
            {loading ? (
                <FaSpinner className="animate-spin text-white text-3xl" />
            ) : (
                <Container>
                    <PostForm />
                </Container>
            )}
        </div>
    );
}

export default AddPost;
