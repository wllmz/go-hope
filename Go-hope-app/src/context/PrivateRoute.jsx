import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";

const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, hasRole, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!isAuthenticated()) {
      navigate("/connexion ");
    } else if (role && !hasRole(role)) {
        `Utilisateur authentifié, mais sans le rôle "${role}". Redirection vers /unauthorized...`
      );
      navigate("/unauthorized");
    } else {
    }
  }, [isAuthenticated, hasRole, role, loading, navigate]);

  if (!loading && isAuthenticated() && (role ? hasRole(role) : true)) {
    return children;
  }

  return null;
};

export default PrivateRoute;
