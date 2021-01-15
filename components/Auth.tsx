import React from 'react';
import axios from 'axios';
import Login from './Login';

export interface AuthContextModel {
  token: string | null;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextModel | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthRespModel {
  token: string;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = React.useState(null);
  const [showLogin, setShowLogin] = React.useState(false);
  const [status, setStatus] = React.useState<'loading' | 'error' | null>(null);

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  const login = async (pwd: string) => {
    setStatus('loading');
    try {
      const { data } = await axios.post<AuthRespModel>('/api/auth', {
        secret: pwd,
      });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setStatus(null);
    } catch (error) {
      setStatus('error');
    }
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const jwt = localStorage.getItem('token');
      setToken(jwt);
      if (!jwt) setShowLogin(true);
      return;
    }
    setShowLogin(true);
  }, []);

  const value: AuthContextModel = {
    token,
    logout,
  };

  if (token) {
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  }

  if (showLogin) {
    return <Login status={status} onLoginTry={login} />;
  }

  return <div/>;
};
