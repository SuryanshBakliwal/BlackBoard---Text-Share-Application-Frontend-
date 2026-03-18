import React from "react";
import '../App.css'

function ShareTextLoader() {
    return (
        <div className="loader-container">
            <div className="loader-box">

                <h3 className="loader-title">Preparing your room...</h3>

                <div className="code-loader">
                    <span>{`> Initializing editor...`}</span>
                    <span>{`> Fetching content...`}</span>
                    <span>{`> Connecting to session...`}</span>
                </div>

                <div className="cursor"></div>
            </div>
        </div>
    );
}

export default ShareTextLoader;