import React, { useState, useEffect, useRef } from 'react'
import { getRoom } from './shareAPi';
import Editor from '@monaco-editor/react';
import { useParams, useNavigate } from 'react-router-dom';



function Room() {

    const { roomCode } = useParams();
    const navigate = useNavigate();
    const socketRef = useRef(null);
    const [content, setContent] = useState("");
    const [language, setLanguage] = useState("plaintext");

    const editorOptions = {
        fontSize: 14,
        wordWrap: 'on',
        minimap: { enabled: false },
        automaticLayout: true,
    };

    const handleEditorChange = (value) => {
        console.log("Helloo");

        setContent(value || "");
        if (socketRef.current && socketRef.current.readyState === 1) {
            socketRef.current.send(value || "");
        }
    }

    useEffect(() => {

        const fetchRoom = async () => {
            try {

                const result = await getRoom(roomCode);

                console.log("Room API response:", result);

                if (result.status === 200) {
                    setContent(result.data.content);
                    setLanguage(result.data.language?.toLowerCase() || "plaintext");
                }

            } catch (error) {
                console.error("Error fetching room:", error);
            }
        };

        fetchRoom();

    }, [roomCode]);

    //web socket connection
    useEffect(() => {
        console.log(`ws://localhost:6001/ws/room/?roomCode=${roomCode}`);

        const socket = new WebSocket(`ws://localhost:6001/ws/room?roomCode=${roomCode}`);
        socket.onmessage = (e) => {
            const data = e.data;
            setContent(data);
        }
        socketRef.current = socket;

        return () => {
            socket.close();
        }
    }, [roomCode]);


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
    )
}

export default Room