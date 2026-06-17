'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { loginMock } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('artsm_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('artsm_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const loggedUser = await loginMock(email, password);
      setUser(loggedUser);
      localStorage.setItem('artsm_user', JSON.stringify(loggedUser));
      setLoading(false);
      return true;
    } catch (err) {
      setError('Identifiants de connexion invalides.');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('artsm_user');
  };

  return { user, loading, error, login, logout };
}
export default useAuth;
