import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../hooks/auth/useLogin";
import FormInput from "../../../utils/form/FormInput";
import PasswordInput from "../../../utils/form/PasswordInput";
import logo from "../../../assets/Logo-FLOW.png";
import background from "../../../assets/background-flow-parent.png";

const LoginForm = () => {
  const navigate = useNavigate();
  const { loading, error, handleLogin } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // État pour le message de succès

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const isSuccess = await handleLogin(data);
      if (isSuccess) {
        setShowSuccessMessage(true); // Affiche le message de succès
        setTimeout(() => {
          navigate("/home"); // Redirige après 1 seconde
        }, 2000);
      }
    } catch (err) {
      console.error("Erreur de connexion :", err);
    }
  };

  return (
    <div className="flex min-h-screen items-stretch justify-center bg-gray-100">
      <div
        className="w-1/2 p-0 hidden md:block"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-center items-center h-[80%]">
          <img
            src={logo}
            alt="Logo"
            className="lg:w-3/5 md:w-4/5 h-auto md:mr-[0px] lg:mr-[90px]"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-8 bg-white shadow-md rounded-md custom-form-width-1 ml-6">
        <h1 className="text-[#0a3d64] text-[28px] sm:text-[30px] md:text-[33px] lg:text-[35px] text-center mb-9 mt-8">
          Connexion
        </h1>
        <p className="text-[#0a3d64] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center mb-10 mt-10">
          Connectez-vous pour accéder à votre espace personnel
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <FormInput
              type="email"
              placeholder="Email *"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div className="mb-6">
            <PasswordInput
              placeholder="Mot de passe *"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {showSuccessMessage && (
            <p className="text-green-500 text-sm mt-2">
              Connexion réussie, redirection...
            </p>
          )}

          <div className="flex flex-col items-center mt-20">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#86bfce] text-[#0a3d64] text-[25px] py-3 rounded-full hover:bg-[#86bfce]/90 text-center"
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>

            <a
              href="#"
              className="text-[#f9a825] text-sm mt-4 block text-center underline"
            >
              Mot de passe oublié ?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
