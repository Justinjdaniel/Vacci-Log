import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

let AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [, setUser, removeUser] = useLocalStorage('user', null);
  const [token, setToken, removeToken] = useLocalStorage('token', null);
  let navigate = useNavigate();

  let signIn = (newToken, user, callback) => {
    return AuthChecker.signIn(() => {
      setToken(newToken);
      setUser(user);
      callback();
    });
  };

  let signOut = callback => {
    return AuthChecker.signOut(() => {
      removeToken();
      removeUser();
      setToken(null);
      navigate('/login');
      callback();
    });
  };

  const AuthChecker = {
    isAuthenticated: false,
    signIn(callback) {
      AuthChecker.isAuthenticated = true;
      setTimeout(callback, 100); // fake async
    },
    signOut(callback) {
      AuthChecker.isAuthenticated = false;
      setTimeout(callback, 100);
    },
  };

  let value = { token, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }) {
  let { token } = useAuth();
  let location = useLocation();

  if (!token) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}
