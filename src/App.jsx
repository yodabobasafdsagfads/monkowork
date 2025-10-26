import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Login from './components/Login';
import MainApp from './components/MainApp';

export default function App(){
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  if(!user) return <Login />;

  return <MainApp user={user} onLogout={()=>signOut(auth)} />;
}
