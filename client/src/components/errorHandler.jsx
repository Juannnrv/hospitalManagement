import React, { useState, useEffect } from 'react';

const Error429 = () => {
    const [countdown, setCountdown] = useState(900); 

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;

    return (
        <div className="flex items-center justify-center min-h-screen bg-red-100">
            <div className="bg-white p-8 rounded shadow-md text-center">
                <h1 className="text-2xl font-bold text-red-600">Too Many Requests</h1>
                <p className="mt-4 text-gray-700">You have made too many requests. Please try again later.</p>
                <p className="mt-4 text-gray-700">Retry in: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
            </div>
        </div>
    );
};

export default Error429;