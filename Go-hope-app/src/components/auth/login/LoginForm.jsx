import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../hooks/auth/useLogin";
import FormInput from "../../../utils/form/FormInput";
import PasswordInput from "../../../utils/form/PasswordInput";
import bg from "../../../assets/bg-papillon.png";

const LoginForm = () => {
  const navigate = useNavigate();
  const { loading, error, handleLogin } = useLogin();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(null); // Réinitialiser l'erreur email

    // Vérification du format de l'email
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("L'email doit être valide.");
      return;
    }

    const data = { email, password };

    try {
      const isSuccess = await handleLogin(data);
      if (!isSuccess) {
        // En cas d'erreur, le hook useLogin met à jour l'état error et on arrête ici
        return;
      }
      // Connexion réussie
      setShowSuccessMessage(true);
      // Redirige vers /home après 2 secondes
      setTimeout(() => {
        navigate("/accueil");
      }, 2000);
    } catch (err) {
      console.error("Erreur de connexion :", err);
      setShowSuccessMessage(false);
    }
  };

  return (
    <div className="step-container-1 flex min-h-screen justify-center items-center">
      <div className="w-full md:w-1/2 rounded-md">
        <div className="flex min-h-screen justify-center items-center">
          <div className="w-full max-w-3xl sm:shadow rounded-lg  sm:p-10 bg-white p-5">
            {/* Header avec bouton de retour et image */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => navigate("/")}
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
                Connexion
              </button>
              <img src={bg} alt="Background Papillon" />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <FormInput
                  type="email"
                  placeholder="Email *"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}

                <PasswordInput
                  type="password"
                  placeholder="password *"
                  value={password}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="text-right mt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/mot-de-passe-oublie")}
                    className="text-[#1D5F84] text-sm hover:underline"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              {showSuccessMessage && (
                <div className="mb-4 text-green-500">Connexion réussie !</div>
              )}

              <div className="flex flex-col gap-4 justify-center mt-10 w-full p-5 items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-[300px] bg-[#1D5F84] hover:bg-[#1D5F84] text-white py-2 px-2 rounded-lg font-semibold text-lg"
                >
                  {loading ? "Vérification..." : "Connexion"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
