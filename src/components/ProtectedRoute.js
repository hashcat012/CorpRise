import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setIsAuthenticated(true);
        // Backend çağrılarında kullanmak için token alıyoruz
        firebaseUser.getIdToken().then(token => {
          localStorage.setItem('firebaseToken', token);
        });
      } else {
        setIsAuthenticated(false);
        navigate('/login');
      }
    });
