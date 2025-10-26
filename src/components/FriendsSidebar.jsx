import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
export default function FriendsSidebar({ user, setCurrentDM, currentDM }){
  const [friends,setFriends]=useState([]);
  useEffect(()=>{
    const unsub = onSnapshot(collection(db,'users'),snap=>{
      const arr=[];
      snap.forEach(d=>arr.push(d.data()));
      setFriends(arr.filter(u=>u.uid!==user.uid));
    });
    return ()=>unsub();
  },[user.uid]);
  return (
    <div className="friends-sidebar">
      {friends.map(f=>(
        <div key={f.uid} className={`friend-item ${currentDM?.uid===f.uid?'active':''}`} onClick={()=>setCurrentDM(f)}>
          {f.displayName||f.email}
        </div>
      ))}
    </div>
  );
}
