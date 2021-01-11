import React from 'react';

export interface AuthContextModel {
  token: string | null;
}

export const AuthContext = React.createContext<AuthContextModel | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = React.useState(null);
  React.useEffect(() => {
    console.log('HERE!');
    if (typeof window !== 'undefined') {
      const jwt = localStorage.getItem('token');
      console.log(jwt);
      setToken(jwt);
    }
  }, []);

  const value: AuthContextModel = {
    token,
  };

  if (token) {
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  }

  return <div>Loading...</div>;
};
