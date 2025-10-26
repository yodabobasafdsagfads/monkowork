import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Login(){
  const [email, setEmail] = useState('');
  const [display, setDisplay] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    try{
      if(isSignup){
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: display || email.split('@')[0] });
        // create user doc
        await setDoc(doc(db, 'users', cred.user.uid), {
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: cred.user.displayName || display,
          createdAt: Date.now()
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch(err){
      alert(err.message);
    }
  }

  return (
    <div className="login-card">
      <h2>{isSignup ? 'Sign up' : 'Sign in'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && <input placeholder="Display name (optional)" value={display} onChange={e=>setDisplay(e.target.value)} />}
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">{isSignup ? 'Create account' : 'Login'}</button>
      </form>
      <button className="link" onClick={()=>setIsSignup(s=>!s)}>{isSignup ? 'Have an account? Sign in' : "Don't have an account? Sign up"}</button>
    </div>
  );
}
