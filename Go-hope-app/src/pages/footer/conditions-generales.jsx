import React from "react";
import Menu from "../../components/layout/menu";

const ConditionsGenerales = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Menu />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-[#1D5F84] mb-6">
            Conditions Générales d'Utilisation
          </h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <p className="italic text-gray-600 mb-4">
                Dernière mise à jour :{" "}
                {new Date().toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <p className="mb-4">
                Bienvenue sur la plateforme GoHope. En accédant à ce service,
                vous acceptez de vous conformer aux présentes Conditions
                Générales d'Utilisation et de les respecter. Si vous n'êtes pas
                d'accord avec l'une quelconque de ces conditions, veuillez ne
                pas utiliser notre plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                1. Définitions
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>"Plateforme"</strong> désigne le site web GoHope,
                  accessible à l'adresse https://go-hope.fr.
                </li>
                <li>
                  <strong>"Utilisateur"</strong> désigne toute personne qui
                  accède à la Plateforme et utilise les Services.
                </li>
                <li>
                  <strong>"Services"</strong> désigne l'ensemble des
                  fonctionnalités mises à disposition des Utilisateurs sur la
                  Plateforme.
                </li>
                <li>
                  <strong>"Compte"</strong> désigne l'espace personnel créé par
                  l'Utilisateur sur la Plateforme.
                </li>
                <li>
                  <strong>"Contenu"</strong> désigne les informations, textes,
                  messages, images, vidéos et tout autre matériel partagé par
                  les Utilisateurs sur la Plateforme.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                2. Objet
              </h2>
              <p>
                Les présentes Conditions Générales d'Utilisation ont pour objet
                de définir les modalités et conditions d'utilisation des
                Services de la Plateforme GoHope, ainsi que de définir les
                droits et obligations des parties dans ce cadre.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                3. Accès à la Plateforme
              </h2>
              <p className="mb-3">
                La Plateforme est accessible gratuitement à toute personne
                disposant d'un accès à Internet. Tous les coûts afférents à
                l'accès à la Plateforme, que ce soient les frais matériels,
                logiciels ou d'accès à Internet sont exclusivement à la charge
                de l'Utilisateur.
              </p>
              <p>
                L'Utilisateur est seul responsable du bon fonctionnement de son
                équipement informatique ainsi que de son accès à Internet. Go
                Hope se réserve le droit de refuser l'accès aux Services,
                unilatéralement et sans notification préalable, à tout
                Utilisateur ne respectant pas les présentes conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                4. Inscription et Compte Utilisateur
              </h2>
              <p className="mb-3">
                L'utilisation complète des Services peut nécessiter la création
                d'un Compte Utilisateur. Lors de son inscription, l'Utilisateur
                s'engage à fournir des informations exactes, à jour et
                complètes. Si les informations fournies sont fausses, inexactes,
                obsolètes ou incomplètes, GoHope se réserve le droit de
                suspendre ou de résilier le Compte de l'Utilisateur et de lui
                refuser tout accès actuel ou futur aux Services.
              </p>
              <p className="mb-3">
                L'Utilisateur est responsable de la préservation de la
                confidentialité de son compte et de son mot de passe. Il sera
                tenu responsable de toutes les activités qui se dérouleront sous
                son compte. L'Utilisateur s'engage à informer immédiatement Go
                Hope de toute utilisation non autorisée de son compte.
              </p>
              <p>
                GoHope ne pourra être tenue responsable de toute perte ou
                dommage résultant du non-respect par l'Utilisateur des
                obligations énoncées ci-dessus.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                5. Comportement des Utilisateurs
              </h2>
              <p className="mb-3">
                En utilisant la Plateforme, l'Utilisateur s'engage à ne pas :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Publier, transmettre ou partager du Contenu illégal,
                  diffamatoire, obscène, pornographique, injurieux, menaçant ou
                  contraire à l'ordre public.
                </li>
                <li>
                  Harceler, menacer, discriminer ou intimider d'autres
                  Utilisateurs.
                </li>
                <li>Usurper l'identité d'une autre personne ou entité.</li>
                <li>
                  Recueillir ou stocker des données personnelles concernant
                  d'autres Utilisateurs sans leur consentement explicite.
                </li>
                <li>
                  Interférer avec ou perturber les Services, serveurs ou réseaux
                  connectés à la Plateforme.
                </li>
                <li>Promouvoir ou faciliter des activités illégales.</li>
                <li>
                  Utiliser la Plateforme à des fins commerciales sans
                  autorisation préalable de GoHope.
                </li>
              </ul>
              <p className="mt-3">
                GoHope se réserve le droit de supprimer tout Contenu qui ne
                respecterait pas ces règles et de suspendre ou résilier le
                Compte de l'Utilisateur concerné.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                6. Propriété Intellectuelle
              </h2>
              <p className="mb-3">
                La Plateforme et son Contenu (textes, images, logos, logiciels,
                etc.) sont protégés par des droits de propriété intellectuelle.
                Toute reproduction, représentation, modification, publication,
                transmission, adaptation ou exploitation de tout ou partie de la
                Plateforme et/ou de son Contenu, par quelque moyen que ce soit,
                sans l'autorisation préalable écrite de GoHope est strictement
                interdite.
              </p>
              <p>
                En publiant du Contenu sur la Plateforme, l'Utilisateur accorde
                à GoHope une licence mondiale, non exclusive, gratuite,
                transférable et sous-licenciable pour utiliser, reproduire,
                distribuer, préparer des œuvres dérivées, afficher et exécuter
                ce Contenu dans le cadre des Services proposés par la
                Plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                7. Données Personnelles
              </h2>
              <p className="mb-3">
                GoHope s'engage à respecter la confidentialité des données
                personnelles des Utilisateurs conformément au Règlement Général
                sur la Protection des Données (RGPD) et à la loi Informatique et
                Libertés.
              </p>
              <p>
                Pour en savoir plus sur la manière dont nous collectons,
                utilisons et protégeons vos données personnelles, veuillez
                consulter notre{" "}
                <a
                  href="/politique-confidentialite"
                  className="text-[#1D5F84] hover:underline"
                >
                  Politique de Confidentialité
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                8. Responsabilité
              </h2>
              <p className="mb-3">
                GoHope s'efforce de maintenir la Plateforme accessible en
                permanence, mais ne peut garantir la disponibilité continue et
                ininterrompue des Services. L'accès à la Plateforme peut être
                interrompu pour des raisons de maintenance, de mise à jour ou
                pour toute autre raison technique.
              </p>
              <p className="mb-3">
                GoHope ne peut être tenue responsable des dommages directs ou
                indirects résultant de l'utilisation ou de l'impossibilité
                d'utiliser la Plateforme, y compris, mais sans s'y limiter, les
                dommages causés par des virus informatiques, la perte de données
                ou d'opportunités commerciales.
              </p>
              <p>
                L'Utilisateur est seul responsable du Contenu qu'il publie sur
                la Plateforme et s'engage à indemniser GoHope contre toute
                réclamation, demande ou action résultant de la publication de ce
                Contenu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                9. Liens Externes
              </h2>
              <p>
                La Plateforme peut contenir des liens vers des sites web tiers.
                Ces liens sont fournis uniquement pour la commodité des
                Utilisateurs. GoHope n'exerce aucun contrôle sur le contenu de
                ces sites et ne peut être tenue responsable de leur contenu ou
                de leur politique de confidentialité.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                10. Modifications des Conditions
              </h2>
              <p>
                GoHope se réserve le droit de modifier les présentes Conditions
                Générales d'Utilisation à tout moment. Les Utilisateurs seront
                informés de toute modification substantielle avant son entrée en
                vigueur. L'utilisation continue de la Plateforme après ces
                modifications constitue l'acceptation des nouvelles conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                11. Résiliation
              </h2>
              <p className="mb-3">
                L'Utilisateur peut résilier son Compte à tout moment en suivant
                les instructions disponibles sur la Plateforme.
              </p>
              <p>
                GoHope se réserve le droit de résilier ou suspendre l'accès d'un
                Utilisateur à la Plateforme, sans préavis et à sa seule
                discrétion, notamment en cas de violation des présentes
                Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                12. Droit Applicable et Juridiction Compétente
              </h2>
              <p>
                Les présentes Conditions sont régies par le droit français. Tout
                litige relatif à l'interprétation ou à l'exécution des présentes
                Conditions sera soumis aux tribunaux français compétents.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                13. Contact
              </h2>
              <p>
                Pour toute question concernant les présentes Conditions
                Générales d'Utilisation, veuillez nous contacter à l'adresse
                suivante :{" "}
                <a
                  href="mailto:contact.gohope@gmail.com-hope.fr"
                  className="text-[#1D5F84] hover:underline"
                >
                  contact.gohope@gmail.com-hope.fr
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionsGenerales;
