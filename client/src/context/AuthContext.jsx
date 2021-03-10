import React, { useContext, useState } from "react";

import axios from "../utils/axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const register = async (email, password) => {};

  const login = async (email, password) => {};

  const logout = async () => {
  setCurrentUser(null)
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
