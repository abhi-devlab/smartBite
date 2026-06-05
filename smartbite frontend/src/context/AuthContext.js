
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/auth";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Signup function
  const signup = async (username, password) => {
    try {
      await axios.post(`${API_URL}/signup`, { username, password });
      return { success: true };
    } catch (error) {
      return { error: error.response?.data?.detail || "Signup failed!" };
    }
  };

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      const userToken = response.data.access_token;
      setToken(userToken);
      localStorage.setItem("token", userToken);
      return { success: true };
    } catch (error) {
      return { error: error.response?.data?.detail || "Login failed!" };
    }
  };

  // Logout function
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
export const useAuth = () => useContext(AuthContext);
