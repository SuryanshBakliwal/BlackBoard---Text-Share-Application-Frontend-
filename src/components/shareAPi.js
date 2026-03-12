import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL; // change when deployed

export const createRoom = async (payload) => {
    try {
        console.log("BASE_URL", BASE_URL);

        const response = await fetch(`${BASE_URL}/api/room/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });


        const rawText = await response.json();   // 👈 get raw response
        console.log("RAW RESPONSE:", rawText);

        if (!response.ok) {
            throw new Error("Failed to create share");
        }

        return rawText;

    } catch (error) {
        throw error;
    }
};

export const getRoom = async (roomCode) => {
    try {
        const response = await fetch(`${BASE_URL}/api/room/${roomCode}`);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};