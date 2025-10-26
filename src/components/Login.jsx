import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [display,setDisplay] = useState('');
  const [isSignup,setIsSignup] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    try{
      if(isSignup){
        const cred = await createUserWithEmailAndPassword(auth,email,password);
        await updateProfile(cred.user,{displayName:display||email.split('@')[0]});
        await setDoc(doc(db,'users',cred.user.uid),{
          uid:cred.user.uid,
          email:cred.user.email,
          displayName:cred.user.displayName||display,
          createdAt:Date.now()
        });
      } else {
        await signInWithEmailAndPassword(auth,email,password);
      }
    } catch(err){alert(err.message)}
  }

  return (
    <div className="discord-login-container">
      <div className="discord-login-box">
        <h1>Monkecord</h1>
        <h2>{isSignup?'Create an account':'Welcome back'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup&&<input type="text" placeholder="Display Name" value={display} onChange={e=>setDisplay(e.target.value)}/>}
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
          <button type="submit">{isSignup?'Sign Up':'Login'}</button>
        </form>
        <div className="switch">{isSignup?'Already have an account?':'Need an account?'} <span onClick={()=>setIsSignup(s=>!s)}>{isSignup?'Login':'Sign Up'}</span></div>
      </div>
    </div>
  );
}
