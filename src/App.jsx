import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';

export default function App(){
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async u => {
      setUser(u);
    });
    return () => unsub();
  }, []);
  return (
    <div className="app-root">
      <header className="topbar">
        <div className="title">Monkecord</div>
        {user && <button className="logout" onClick={() => signOut(auth)}>Logout</button>}
      </header>
      <main>
        {!user ? <Login /> : <ChatRoom user={user} />}
      </main>
    </div>
  );
}
