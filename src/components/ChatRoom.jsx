import React, { useEffect, useState } from 'react';
import { db, auth, storage } from '../firebase';
import { collection, doc, setDoc, getDocs, query, where, onSnapshot, addDoc, orderBy, serverTimestamp, updateDoc } from 'firebase/firestore';
import ChannelList from './ChannelList';
import MessageInput from './MessageInput';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function ChatRoom({ user }){
  const [users, setUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // load users
    const q = query(collection(db, 'users'));
    const unsub = onSnapshot(q, snap => {
      const arr = [];
      snap.forEach(d => arr.push(d.data()));
      setUsers(arr.filter(u => u.uid !== user.uid));
    });
    return () => unsub();
  }, [user.uid]);

  useEffect(() => {
    if(!currentRoom) return;
    const msgsRef = collection(db, 'rooms', currentRoom.id, 'messages');
    const q = query(msgsRef, orderBy('createdAt'));
    const unsub = onSnapshot(q, snap => {
      const ms = [];
      snap.forEach(d => ms.push({ id: d.id, ...d.data() }));
      setMessages(ms);
    });
    return () => unsub();
  }, [currentRoom]);

  async function openDM(other){
    // deterministic room id by sorted uids
    const ids = [user.uid, other.uid].sort();
    const roomId = ids.join('_');
    const roomRef = doc(db, 'rooms', roomId);
    await setDoc(roomRef, {
      id: roomId,
      type: 'dm',
      members: ids,
      createdAt: serverTimestamp()
    }, { merge: true });
    setCurrentRoom({ id: roomId, other });
  }

  async function sendMessage(text, file){
    if(!currentRoom) return;
    const msgsRef = collection(db, 'rooms', currentRoom.id, 'messages');
    let fileUrl = null;
    if(file){
      const path = `uploads/${currentRoom.id}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, path);
      const task = uploadBytesResumable(storageRef, file);
      await task;
      fileUrl = await getDownloadURL(storageRef);
    }
    await addDoc(msgsRef, {
      senderId: user.uid,
      senderName: user.displayName || user.email.split('@')[0],
      text: text || '',
      fileUrl,
      createdAt: Date.now()
    });
  }

  return (
    <div className="chat-root">
      <ChannelList users={users} openDM={openDM} currentRoom={currentRoom} />
      <div className="chat-main">
        {!currentRoom ? <div className="empty">Select a user to start a DM</div> : (
          <>
            <div className="chat-header">Chat with {currentRoom.other.displayName || currentRoom.other.email}</div>
            <div className="messages">
              {messages.map(m => (
                <div key={m.id} className={`message ${m.senderId === user.uid ? 'me' : ''}`}>
                  <div className="meta">{m.senderName} • {new Date(m.createdAt).toLocaleString()}</div>
                  <div className="text">{m.text}</div>
                  {m.fileUrl && <div className="file"><a href={m.fileUrl} target="_blank" rel="noreferrer">Open attachment</a></div>}
                </div>
              ))}
            </div>
            <MessageInput onSend={sendMessage} />
          </>
        )}
      </div>
    </div>
  );
}
