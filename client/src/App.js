import React, { useState, useEffect } from "react";

function App() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log(`app effect`);
    async function getData() {
      const profile = await fetch("/api/auth/user", {
        headers: { "Content-Type": "application/json" },
      });

      setProfile(JSON.stringify(await profile.json(), undefined, 2));
    }

    getData();
  }, []);

  const authFetch = async () => {
    // doesn't work, throws cors error, tried to emulate link opening via headers
    await fetch("http://localhost:3001/api/auth/github", {
      method: "GET",
      headers: {
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Upgrade-Insecure-Requests": 1,
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
        <pre>{profile}</pre>
      ) : (
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            border: "1.5px solid black",
          }}
        >
          <h2>auth</h2>
          <button onClick={authNewWindow}>auth new window</button>
          <button onClick={authFetch}>auth via fetch</button>
          <a href="/api/auth/github">Auth html link</a>
        </div>
      )}
    </>
  );
}

export default App;
