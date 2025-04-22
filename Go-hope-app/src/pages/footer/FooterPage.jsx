import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const FooterPage = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const isLoggedIn = !!currentUser;

  return (
    <footer className="bg-gradient-to-b from-[#1D5F84] to-[#164c6d] text-white py-8 sm:py-12 mt-10">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section principale du footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 mb-12">
          {/* Logo et slogan */}
          <div className="flex flex-col items-center sm:items-start transform hover:scale-105 transition duration-300">
            <img
              src="/src/assets/Logo.png"
              alt="GoHope Logo"
              className="h-24 sm:h-28 mb-3"
            />
          </div>

          {/* Navigation au centre - visible uniquement si connecté */}
          {isLoggedIn && (
            <div className="w-full">
              <h3 className="text-white text-lg font-semibold mb-4 text-center sm:text-left relative pb-2 before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:sm:left-0 before:w-16 before:h-[2px] before:bg-[#8CBED6] before:transform before:translate-x-[-50%] before:sm:translate-x-0">
                Navigation
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 justify-items-center sm:justify-items-start">
                <button
                  onClick={() => navigate("/accueil")}
                  className="text-white hover:text-[#8CBED6] transition duration-300 flex items-center w-auto"
                >
                  <span className="mr-2 text-[#8CBED6]">›</span>
                  <span>Accueil</span>
                </button>
                <button
                  onClick={() => navigate("/la-sep")}
                  className="text-white hover:text-[#8CBED6] transition duration-300 flex items-center w-auto"
                >
                  <span className="mr-2 text-[#8CBED6]">›</span>
                  <span>La SEP</span>
                </button>
                <button
                  onClick={() => navigate("/forum")}
                  className="text-white hover:text-[#8CBED6] transition duration-300 flex items-center w-auto"
                >
                  <span className="mr-2 text-[#8CBED6]">›</span>
                  <span>Forum</span>
                </button>
                <button
                  onClick={() => navigate("/partenaires")}
                  className="text-white hover:text-[#8CBED6] transition duration-300 flex items-center w-auto"
                >
                  <span className="mr-2 text-[#8CBED6]">›</span>
                  <span>Partenaires</span>
                </button>
              </div>
            </div>
          )}

          {/* Liens légaux */}
          <div
            className={`flex flex-col space-y-3 items-center ${
              isLoggedIn ? "sm:items-end" : "sm:items-start lg:col-start-3"
            }`}
          >
            <h3
              className={`text-white text-lg font-semibold mb-1 text-center ${
                isLoggedIn ? "sm:text-right" : "sm:text-left"
              } relative pb-2 before:content-[''] before:absolute before:bottom-0 before:left-1/2 ${
                isLoggedIn
                  ? "before:sm:right-0 before:sm:left-auto"
                  : "before:sm:left-0"
              } before:w-16 before:h-[2px] before:bg-[#8CBED6] before:transform before:translate-x-[-50%] before:sm:translate-x-0`}
            >
              Legal
            </h3>
            <div
              className={`mt-3 flex flex-col items-center ${
                isLoggedIn ? "sm:items-end" : "sm:items-start"
              } space-y-3`}
            >
              <button
                onClick={() => navigate("/mentions-legales")}
                className={`text-white hover:text-[#8CBED6] transition duration-300 text-center ${
                  isLoggedIn ? "sm:text-right" : "sm:text-left"
                }`}
              >
                Mentions Légales
              </button>
              <button
                onClick={() => navigate("/politique-confidentialite")}
                className={`text-white hover:text-[#8CBED6] transition duration-300 text-center ${
                  isLoggedIn ? "sm:text-right" : "sm:text-left"
                }`}
              >
                Politique de confidentialité
              </button>
              <button
                onClick={() => navigate("/conditions-generales")}
                className={`text-white hover:text-[#8CBED6] transition duration-300 text-center ${
                  isLoggedIn ? "sm:text-right" : "sm:text-left"
                }`}
              >
                Conditions générales
              </button>
              <button
                onClick={() => navigate("/cookies")}
                className={`text-white hover:text-[#8CBED6] transition duration-300 text-center ${
                  isLoggedIn ? "sm:text-right" : "sm:text-left"
                }`}
              >
                Cookies
              </button>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="w-full h-px bg-white bg-opacity-20 my-6 sm:my-8"></div>

        {/* Icônes réseaux sociaux et copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-300 mb-6 sm:mb-0 order-2 sm:order-1 text-center sm:text-left">
            {currentYear} GoHope. Tous droits réservés.
          </div>

          <div className="flex justify-center space-x-4 mb-6 sm:mb-0 order-1 sm:order-2">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-[#0e4a71] hover:bg-[#8CBED6] p-2 sm:p-3 rounded-full transition duration-300 transform hover:scale-110"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-[#0e4a71] hover:bg-[#8CBED6] p-2 sm:p-3 rounded-full transition duration-300 transform hover:scale-110"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-[#0e4a71] hover:bg-[#8CBED6] p-2 sm:p-3 rounded-full transition duration-300 transform hover:scale-110"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
