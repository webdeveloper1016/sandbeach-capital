import React from 'react';
import Login from './Login';

export interface AuthContextModel {
  token: string | null;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextModel | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = React.useState(null);
  const [showLogin, setShowLogin] = React.useState(false);

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      setToken(null);
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
    return <Login />;
  }

  return <div>Loading...</div>;
};
