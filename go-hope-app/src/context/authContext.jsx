import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthenticatedUser } from "../services/auth/registerService"; // Appel à /me
import useAuthRefresh from "./useAuthRefresh";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Indique si la vérification est en cours
  const navigate = useNavigate();

  useAuthRefresh(); // Rafraîchit les tokens automatiquement si nécessaire

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Vérification de l'utilisateur...");
        const authenticatedUser = await getAuthenticatedUser(); // Appelle /me
        console.log("Utilisateur authentifié :", authenticatedUser);

        if (authenticatedUser) {
          setUser(authenticatedUser); // Stocke l'utilisateur
        }
      } catch (error) {
        console.warn(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
        // N'effacez pas nécessairement l'utilisateur en cas d'erreur réseau légère
        setUser(null);
      } finally {
        setLoading(false); // Fin du chargement, pas besoin de `setTimeout`
      }
    };

    fetchUser();
  }, []);

  const isAuthenticated = () => !!user; // Utilisateur authentifié si `user` existe
  const hasRole = (role) => user?.roles?.includes(role); // Vérifier les rôles

  const logout = () => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
