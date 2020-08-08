import React, { useEffect, useState } from "react";

function App() {
  const [profile, setProfile] = useState(null);
  // useEffect(() => {
  //   async function fetchUser() {

  //     setProfile(response);
  //   }
  //   fetchUser();
  // }, []);

  const auth = async () => {
    const data = await fetch("/api/auth/github", { method: "GET" });
    const profile = await data.json();
    setProfile(profile);
  }

  return (
    <>
      <h1>Client side</h1>
      {profile ? <code>{JSON.stringify(profile)}</code> : <button onClick={auth}>auth</button>}
      
    </>
  );
}

export default App;
