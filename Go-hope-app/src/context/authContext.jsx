import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthenticatedUser } from "../services/auth/authService";
import useTokenRefresh from "../hooks/refresh/useTokenRefresh";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useTokenRefresh();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        
        const authenticatedUser = await getAuthenticatedUser();

        if (authenticatedUser) {
          setUser(authenticatedUser);
        }
      } catch (error) {
        
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const hasRole = (role) => {

    if (user && user.user && Array.isArray(user.user.roles)) {
      return user.user.roles.includes(role);
    }

    return false;
  };

  const isAuthenticated = () => !!user;

  const logout = () => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, hasRole, logout, setUser }}
    >
      {!loading && children}{" "}
      {/* Affiche le contenu uniquement après le chargement */}
    </AuthContext.Provider>
  );
};
