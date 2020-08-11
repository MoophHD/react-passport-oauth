import React, { useState } from "react";

function App() {
  const [profile, setProfile] = useState(null);

  const authFetch = async () => {
    // doesn't work, throws cors error, tried to emulate link opening via headers
    await fetch("http://localhost:3001/api/auth/github", {
      method: "GET",
      headers: {
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Upgrade-Insecure-Requests": 1
      },
    });
  };

  const authNewWindow = () => {
    window.open("/api/auth/github");
  };

  return (
    <>
      <h1>Client side</h1>
      {profile ? (
        <code>{JSON.stringify(profile)}</code>
      ) : (
        <div style={{ display: "inline-flex", flexDirection: "column" }}>
          <button onClick={authNewWindow}>auth new window</button>
          <button onClick={authFetch}>auth via fetch</button>
          <a href="/api/auth/github">Auth html link</a>
        </div>
      )}
    </>
  );
}

export default App;
