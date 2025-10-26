import React from 'react';
export default function ServerBar({ servers, currentServer, setCurrentServer }){
  return (
    <div className="server-bar">
      {servers.map(s=>(
        <div key={s.id} className={`server-icon ${currentServer?.id===s.id?'active':''}`} onClick={()=>setCurrentServer(s)}>
          {s.name[0].toUpperCase()}
        </div>
      ))}
      <div className="server-icon add">+</div>
    </div>
  );
}
