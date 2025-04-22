import React from "react";
import Menu from "../../components/layout/menu";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Menu />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-[#1D5F84] mb-6">
            Mentions Légales
          </h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                1. Mentions légales
              </h2>

              <div className="mb-4">
                <h3 className="font-medium text-[#1D5F84] mb-2">
                  1.1. Éditeur du site
                </h3>
                <p>
                  Le présent site gohope.fr
                  <br />
                  E‑mail :{" "}
                  <a
                    href="mailto:contact.gohope@gmail.comhope.fr"
                    className="text-[#1D5F84] hover:underline"
                  >
                    contact.gohope@gmail.comhope.fr
                  </a>{" "}
                  – Tél. : +33 6 26 52 21 16
                </p>
                <p className="mt-2 italic">
                  Dès la création de la société ou de l'association GoHope, ces
                  mentions seront mises à jour.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-[#1D5F84] mb-2">
                  1.2. Directeur·rice de la publication
                </h3>
                <p>
                  Laurine Clair, Clémence Grosperrin, en sa qualité de
                  fondateur·rice du projet GoHope.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-[#1D5F84] mb-2">
                  1.3. Hébergement
                </h3>
                <p>
                  Site hébergé par o2switch, SARL au capital de 100 000 €,
                  <br />
                  222 Bd Gustave Flaubert, 63000 Clermont‑Ferrand, France – Tél.
                  : 04 44 44 60 40.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-[#1D5F84] mb-2">
                  1.4. Propriété intellectuelle
                </h3>
                <p>
                  L'ensemble des contenus présents sur le site (textes,
                  graphismes, logo GoHope, etc.) est protégé par le Code de la
                  propriété intellectuelle.
                  <br />
                  Toute reproduction, représentation ou diffusion, totale ou
                  partielle, sans autorisation écrite préalable est interdite.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-[#1D5F84] mb-2">
                  1.5. Responsabilité
                </h3>
                <p>
                  Les informations publiées sont fournies à titre indicatif et
                  ne se substituent pas à un avis médical. L'Éditeur décline
                  toute responsabilité quant à l'usage qui pourrait en être
                  fait.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
