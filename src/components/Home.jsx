import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useNavigate } from "react-router-dom";
import { createRoom } from './shareAPi';

const LANGUAGE_OPTIONS = {
  AUTO: "Auto-detect",
  JAVA: "Java",
  JAVASCRIPT: "JavaScript",
  PYTHON: "Python",
  CPP: "C++"
};

const LANGUAGE_MAP = {
  AUTO: "plaintext",
  JAVA: "java",
  JAVASCRIPT: "javascript",
  PYTHON: "python",
  CPP: "cpp"
};

const EXPIRY_OPTIONS = {
  ONE_HOUR: "1 hour",
  ONE_DAY: "1 day",
  TWO_DAYS: "2 days",
  ONE_WEEK: "1 week",
  ONE_MONTH: "1 month"
};

function Home() {

  const [language, setSelectedLanguage] = useState("AUTO");
  const [expiry, setExpiryTime] = useState("ONE_DAY");
  const [editorContent, setEditorContent] = useState("");

  const navigate = useNavigate();

  const editorOptions = {
    fontSize: 14,
    wordWrap: 'on',
    minimap: { enabled: false },
    automaticLayout: true,
  };

  const handleEditorChange = (value) => {
    setEditorContent(value || "");
  };

  const handleCreateShare = async () => {
    const payload = {
      content: editorContent,
      language: language,
      expiry: expiry
    };

    const result = await createRoom(payload);
    const roomCode = result.data;

    navigate(`/${roomCode}`);
  };

  return (
    <main className="bb-main flex-fill">
      <div className="container-fluid px-4 px-md-5"> {/* 🔥 FULL WIDTH */}
        <div className="row justify-content-center">
          <div className="col-12 col-xl-11"> {/* 🔥 WIDER */}

            <section className="bb-main-card p-4 p-md-5 rounded-4">

              <header className="mb-4">
                <h1 className="bb-title mb-2">Share text in seconds</h1>
                <p className="bb-subtitle mb-0">
                  Paste your code or text below, choose options, and generate a shareable link.
                </p>
              </header>

              {/* 🔥 EDITOR */}
              <div className="mb-3">
                <Editor
                  height="60vh" // 🔥 Bigger & responsive
                  theme="vs-dark"
                  language={LANGUAGE_MAP[language]} // 🔥 dynamic language
                  value={editorContent}
                  onChange={handleEditorChange}
                  options={editorOptions}
                />
              </div>

              {/* OPTIONS */}
              <div className="bb-options-bar d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between mt-3">

                <div className="d-flex align-items-center flex-wrap gap-3">

                  {/* Language */}
                  <div className="d-flex align-items-center gap-2 me-3">
                    <span className="bb-options-icon rounded-circle d-inline-flex align-items-center justify-content-center">
                      <i className="bi bi-sliders" />
                    </span>
                    <span className="bb-options-label">Syntax</span>

                    <select
                      className="form-select form-select-sm bb-select"
                      value={language}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                    >
                      {Object.entries(LANGUAGE_OPTIONS).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Expiry */}
                  <div className="d-flex align-items-center gap-2">
                    <span className="bb-options-label">Expires</span>

                    <select
                      className="form-select form-select-sm bb-select"
                      value={expiry}
                      onChange={(e) => setExpiryTime(e.target.value)}
                    >
                      {Object.entries(EXPIRY_OPTIONS).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Button */}
                <div className="mt-3 mt-md-0">
                  <button
                    type="button"
                    className="btn bb-primary-btn rounded-pill px-4 py-2 w-100 w-md-auto"
                    onClick={handleCreateShare}
                    disabled={!editorContent.trim()}
                  >
                    Create Share
                  </button>
                </div>

              </div>

            </section>

          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;