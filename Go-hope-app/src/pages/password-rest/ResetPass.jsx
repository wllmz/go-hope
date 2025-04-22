import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import bg from "../../assets/bg-papillon.png";
import { useResetPassword } from "../../hooks/auth/useResetPassword";
import PasswordInput from "../../utils/form/PasswordInput";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const { resetPassword, loading, error, message } = useResetPassword();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setLocalError("Token manquant.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setLocalError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLocalError("");
    await resetPassword(newPassword, token);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        navigate("/connexion");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, navigate]);

  return (
    <div className="step-container-1 flex min-h-screen justify-center items-center">
      <div className="w-full md:w-1/2 rounded-md">
        <div className="flex min-h-screen justify-center items-center">
          <div className="w-full max-w-3xl sm:shadow rounded-lg sm:p-10 bg-white p-5">
            {/* Header avec bouton de retour et image */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => navigate("/connexion")}
                className="flex items-center text-[#0E3043]"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Réinitialisation
              </button>
              <img src={bg} alt="Background Papillon" />
            </div>

            <h1 className="text-2xl text-[#0a3d64] font-medium mb-4">
              Réinitialisation du mot de passe
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <PasswordInput
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Nouveau mot de passe *"
                  showPassword={showNewPassword}
                  setShowPassword={setShowNewPassword}
                />
              </div>
              <div className="mb-4">
                <PasswordInput
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirmer le mot de passe *"
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                />
              </div>

              {localError && (
                <p className="text-red-500 text-sm mt-1">{localError}</p>
              )}
              {message && <div className="mb-4 text-green-500">{message}</div>}
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

              <div className="flex flex-col gap-4 justify-center mt-10 w-full p-5 items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-[300px] bg-[#1D5F84] hover:bg-[#1D5F84] text-white py-2 px-2 rounded-lg font-semibold text-lg"
                >
                  {loading ? "En cours..." : "Réinitialiser mon mot de passe"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
