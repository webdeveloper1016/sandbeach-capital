import React from 'react';
import Section from './Section';
import Header from './Header';
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
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="container mx-auto bg-green-500 shadow rounded-md p-5">
          <Header content="Login" size="lg" />
          <input
            placeholder="Enter the password"
            className="border  rounded-md py-2 px-3 text-grey-darkest focus:outline-none focus:ring focus:border-blue-300"
            name="password"
            type="password"
          />
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
};
