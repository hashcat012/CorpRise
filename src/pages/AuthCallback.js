import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function AuthCallback({ email, password }) {
  const navigate = useNavigate();

  useEffect(() => {
    const login = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        localStorage.setItem('firebaseToken', token);
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('Firebase login error:', error);
        navigate('/login');
      }
    };

    login();
  }, [navigate, email, password]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#09090B]">
      <div className="text-white font-mono text-sm uppercase tracking-widest animate-pulse">
        AUTHENTICATING...
      </div>
    </div>
  );
}
