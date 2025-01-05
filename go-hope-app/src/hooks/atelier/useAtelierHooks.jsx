import { useState } from "react";
import {
  allAtlier,
  joinAtelier,
  leaveAtelier,
} from "../../services/atelier/atelierServices";

export const useAtelierHooks = () => {
  // Hook pour récupérer tous les ateliers
  const useGetAllAteliers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ateliers, setAteliers] = useState([]);

    const handleGetAllAteliers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await allAtlier();
        setAteliers(data);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { ateliers, handleGetAllAteliers, loading, error };
  };

  // Hook pour rejoindre un atelier
  const useJoinAtelier = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleJoinAtelier = async (id) => {
      setLoading(true);
      setError(null);
      try {
        const data = await joinAtelier(id);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleJoinAtelier, loading, error };
  };

  // Hook pour quitter un atelier
  const useLeaveAtelier = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLeaveAtelier = async (id) => {
      setLoading(true);
      setError(null);
      try {
        const data = await leaveAtelier(id);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleLeaveAtelier, loading, error };
  };

  return {
    useGetAllAteliers,
    useJoinAtelier,
    useLeaveAtelier,
  };
};
