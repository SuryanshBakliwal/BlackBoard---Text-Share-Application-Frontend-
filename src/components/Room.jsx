import React, { useState, useEffect, useRef } from 'react'
import { getRoom } from './shareAPi';
import Editor from '@monaco-editor/react';
import { useParams, useNavigate } from 'react-router-dom';
import ShareTextLoader from './ShareTextLoader';

function Room() {

    const { roomCode } = useParams();
    const navigate = useNavigate();

    const socketRef = useRef(null);
    const debounceRef = useRef(null);

    // debug counters
    const connectCountRef = useRef(0);
    const messageCountRef = useRef(0);
    const sendCountRef = useRef(0);

    const [content, setContent] = useState("");
    const [language, setLanguage] = useState("plaintext");
    const [roomNotFound, setRoomNotFound] = useState(false);
    const [loading, setLoading] = useState(true);

    const editorOptions = {
        fontSize: 14,
        wordWrap: 'on',
        minimap: { enabled: false },
        automaticLayout: true,
    };

    // Handle editor change with debounce
    const handleEditorChange = (value) => {
        setContent(value || "");

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.send(value || "");

                sendCountRef.current += 1;
                console.log(" Messages sent:", sendCountRef.current);
            }
        }, 300);
    };

    // Fetch room data
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                setLoading(true);
                const result = await getRoom(roomCode);

                console.log("Room API response:", result);

                if (result.status === 200) {
                    setContent(result.data.content);
                    setLanguage(result.data.language?.toLowerCase() || "plaintext");
                } else {
                    setRoomNotFound(true);
                }
            } catch (error) {
                console.error("Error fetching room:", error);
                setRoomNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchRoom();
    }, [roomCode]);

    // WebSocket connection
    useEffect(() => {
        if (roomNotFound || !roomCode) return;

        const url = import.meta.env.VITE_SOCKET_URL;

        // Close previous socket (important)
        if (socketRef.current) {
            socketRef.current.close();
        }

        const socketId = Math.random().toString(36).slice(2, 8);
        console.log(" Creating socket:", socketId);

        const socket = new WebSocket(`${url}/room?roomCode=${roomCode}`);
        socketRef.current = socket;

        socket.onopen = () => {
            connectCountRef.current += 1;
            console.log(" WebSocket connected:", connectCountRef.current);
        };

        socket.onmessage = (e) => {
            messageCountRef.current += 1;
            console.log("Messages received:", messageCountRef.current);

            setContent(e.data);
        };

        socket.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        return () => {
            socket.close();
        };
    }, [roomCode]);

    // Clear debounce on unmount
    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    // Loading UI
    if (loading) {
        return <ShareTextLoader />;
    }

    // Room not found UI
    if (roomNotFound) {
        return (
            <main className="bb-main flex-fill d-flex align-items-center justify-content-center">
                <div className="text-center">

                    <div style={{ fontSize: "40px", opacity: 0.6 }}>✖</div>

                    <h2 className="mt-3">Share Not Available</h2>

                    <p className="text-muted mt-2">
                        This share link may have expired,<br />
                        been removed, or never existed.
                    </p>

                    <button
                        className="btn bb-primary-btn rounded-pill px-4 py-2 mt-3"
                        onClick={() => navigate("/")}
                    >
                        + Create a New Share
                    </button>
                </div>
            </main>
        );
    }

    // Main UI
    return (
        <main className="bb-main flex-fill">
            <div className="container-fluid bb-main-container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-11">

                        <section className="bb-main-card p-4 p-md-5 rounded-4">

                            <Editor
                                height="400px"
                                theme="vs-dark"
                                language={language}
                                value={content}
                                options={editorOptions}
                                onChange={handleEditorChange}
                            />

                            <div className="text-center mt-4">
                                <button
                                    className="btn bb-primary-btn rounded-pill px-4 py-2"
                                    onClick={() => navigate("/")}
                                >
                                    Create New Room
                                </button>
                            </div>

                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Room;