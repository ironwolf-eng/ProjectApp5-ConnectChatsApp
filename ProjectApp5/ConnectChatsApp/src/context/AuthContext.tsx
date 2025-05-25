import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, email = 'no-email@connectchats.org') => {
    if (!username) {
      console.warn('❌ Username is required to log in');
      return false;
    }

    const newUser = {
      username,
      email,
      photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}`,
      status: 'online',
    };

    setUser(newUser);
    console.log('✅ User logged in:', newUser);
    return true;
  };

  const updateUser = (updates) => {
    setUser((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const logout = () => {
    console.log('👋 User logged out');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
