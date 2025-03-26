import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";

const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, hasRole, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      console.log("Chargement en cours, attente...");
      return;
    }

    if (!isAuthenticated()) {
      console.log("Utilisateur non authentifié, redirection vers /login...");
      navigate("/connexion ");
    } else if (role && !hasRole(role)) {
      console.log(
        `Utilisateur authentifié, mais sans le rôle "${role}". Redirection vers /unauthorized...`
      );
      navigate("/unauthorized");
    } else {
      console.log("Utilisateur autorisé à accéder à cette route.");
    }
  }, [isAuthenticated, hasRole, role, loading, navigate]);

  if (!loading && isAuthenticated() && (role ? hasRole(role) : true)) {
    return children;
  }

  return null;
};

export default PrivateRoute;
