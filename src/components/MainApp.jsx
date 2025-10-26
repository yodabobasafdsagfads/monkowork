import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import ServerBar from './ServerBar';
import FriendsSidebar from './FriendsSidebar';
import ChatArea from './ChatArea';

export default function MainApp({ user, onLogout }){
  const [servers,setServers] = useState([]);
  const [currentServer,setCurrentServer] = useState(null);
  const [currentDM,setCurrentDM] = useState(null);

  useEffect(()=>{
    const unsub = onSnapshot(collection(db,'servers'),snap=>{
      const arr=[];
      snap.forEach(d=>arr.push({id:d.id,...d.data()}));
      setServers(arr);
    });
    return ()=>unsub();
  },[]);

  return (
    <div className="main-app">
      <ServerBar servers={servers} currentServer={currentServer} setCurrentServer={setCurrentServer} />
      <FriendsSidebar user={user} setCurrentDM={setCurrentDM} currentDM={currentDM} />
      <ChatArea user={user} server={currentServer} dm={currentDM} />
      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </div>
  );
}
