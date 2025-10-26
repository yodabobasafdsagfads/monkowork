import React from 'react';
export default function ChannelList({ users, openDM, currentRoom }){
  return (
    <aside className="sidebar">
      <div className="sidebar-top"><h3>Contacts</h3></div>
      <div className="contacts">
        {users.map(u => (
          <div key={u.uid} className="contact" onClick={() => openDM(u)}>
            <div className="avatar">{(u.displayName||u.email||'U').slice(0,1).toUpperCase()}</div>
            <div className="meta">
              <div className="name">{u.displayName || u.email}</div>
              <div className="sub">{u.email}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
