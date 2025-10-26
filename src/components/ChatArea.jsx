import React from 'react';
export default function ChatArea({ user, server, dm }){
  return (
    <div className="chat-area">
      {dm ? <h2>DM with {dm.displayName||dm.email}</h2> : <h2>{server?server.name:'Select a DM or server'}</h2>}
    </div>
  );
}
