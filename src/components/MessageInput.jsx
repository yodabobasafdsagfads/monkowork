import React, { useState } from 'react';
export default function MessageInput({ onSend }){
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  function submit(e){
    e.preventDefault();
    if(!text && !file) return;
    onSend(text, file);
    setText('');
    setFile(null);
    // reset file input via form reset is fine on DOM; here we just null it
  }
  return (
    <form className="composer" onSubmit={submit}>
      <input value={text} onChange={e=>setText(e.target.value)} placeholder="Message..." />
      <input type="file" onChange={e=>setFile(e.target.files[0])} />
      <button type="submit">Send</button>
    </form>
  );
}
