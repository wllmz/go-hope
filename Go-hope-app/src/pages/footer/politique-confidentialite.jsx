import React from "react";
import Menu from "../../components/layout/menu";

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Menu />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-[#1D5F84] mb-6">
            Politique de Confidentialité
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
                Chez GoHope, nous accordons une grande importance à la
                protection de votre vie privée. Cette politique de
                confidentialité explique comment nous collectons, utilisons,
                partageons et protégeons vos données personnelles lorsque vous
                utilisez notre plateforme.
              </p>
              <p>
                En utilisant notre site, vous acceptez les pratiques décrites
                dans la présente politique de confidentialité. Veuillez la lire
                attentivement pour comprendre comment nous traitons vos
                informations personnelles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                1. Qui sommes-nous ?
              </h2>
              <p>
                GoHope est une association à but non lucratif dédiée au soutien
                des personnes atteintes de sclérose en plaques (SEP). Notre
                plateforme en ligne vise à fournir des informations, des
                ressources et un espace d'échange pour les personnes concernées
                par cette maladie.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                2. Informations que nous collectons
              </h2>

              <div className="mb-4">
                <h3 className="font-medium text-[#1D5F84] mb-2">
                  Données que vous nous fournissez directement
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Informations d'identification (nom, prénom, adresse email)
                  </li>
                  <li>
                    Données de profil (photo, âge, sexe, situation personnelle
                    liée à la SEP)
                  </li>
                  <li>
                    Contenu que vous publiez (messages, commentaires,
                    témoignages)
                  </li>
                  <li>
                    Données de communication (correspondances avec notre équipe)
                  </li>
                  <li>Informations de santé que vous choisissez de partager</li>
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-[#1D5F84] mb-2">
                  Données collectées automatiquement
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Données de connexion (adresse IP, type de navigateur)</li>
                  <li>
                    Informations sur votre appareil (système d'exploitation,
                    modèle)
                  </li>
                  <li>
                    Données d'utilisation (pages visitées, temps passé sur le
                    site)
                  </li>
                  <li>
                    Cookies et technologies similaires (voir notre{" "}
                    <a
                      href="/cookies"
                      className="text-[#1D5F84] hover:underline"
                    >
                      Politique de Cookies
                    </a>
                    )
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                3. Comment utilisons-nous vos données ?
              </h2>
              <p className="mb-3">
                Nous utilisons vos données personnelles pour les finalités
                suivantes :
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Fournir et améliorer nos services</strong> : créer et
                  gérer votre compte, personnaliser votre expérience, analyser
                  l'utilisation de notre plateforme pour l'améliorer.
                </li>
                <li>
                  <strong>Communication</strong> : vous contacter au sujet de
                  votre compte, répondre à vos demandes, vous envoyer des
                  informations importantes concernant notre plateforme.
                </li>
                <li>
                  <strong>Communauté et forum</strong> : faciliter les
                  interactions entre utilisateurs, modérer le contenu, assurer
                  un environnement sécurisé.
                </li>
                <li>
                  <strong>Développement et recherche</strong> : analyser les
                  tendances d'utilisation, conduire des enquêtes et des
                  recherches pour améliorer nos services et notre compréhension
                  de la SEP (toujours sous forme anonymisée).
                </li>
                <li>
                  <strong>Sécurité et conformité légale</strong> : protéger nos
                  utilisateurs, détecter et prévenir les fraudes, se conformer
                  aux obligations légales.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                4. Base légale du traitement
              </h2>
              <p className="mb-3">
                Nous traitons vos données personnelles sur les bases légales
                suivantes :
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Exécution d'un contrat</strong> : lorsque le
                  traitement est nécessaire à l'exécution du contrat qui nous
                  lie lorsque vous utilisez nos services.
                </li>
                <li>
                  <strong>Consentement</strong> : lorsque vous nous avez donné
                  votre consentement explicite pour traiter vos données pour une
                  finalité spécifique.
                </li>
                <li>
                  <strong>Intérêts légitimes</strong> : lorsque le traitement
                  est nécessaire pour poursuivre nos intérêts légitimes, sans
                  porter atteinte à vos droits et libertés.
                </li>
                <li>
                  <strong>Obligation légale</strong> : lorsque le traitement est
                  nécessaire pour respecter une obligation légale à laquelle
                  nous sommes soumis.
                </li>
              </ul>

              <p className="mt-3">
                Pour les données de santé, qui sont des données sensibles, nous
                nous basons uniquement sur votre consentement explicite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                5. Partage de vos informations
              </h2>
              <p className="mb-3">
                Nous ne vendons jamais vos données personnelles à des tiers.
                Nous pouvons partager vos informations dans les circonstances
                suivantes :
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Prestataires de services</strong> : nous pouvons
                  partager vos informations avec des prestataires de services
                  qui nous aident à exploiter notre plateforme (hébergement,
                  analyses, support client).
                </li>
                <li>
                  <strong>Avec votre consentement</strong> : nous pouvons
                  partager vos informations lorsque vous nous donnez
                  explicitement votre consentement pour le faire.
                </li>
                <li>
                  <strong>Obligations légales</strong> : nous pouvons divulguer
                  vos informations si la loi nous y oblige ou en réponse à des
                  demandes légales valides.
                </li>
                <li>
                  <strong>Protection des droits</strong> : nous pouvons partager
                  des informations pour protéger les droits, la propriété ou la
                  sécurité de GoHope, de nos utilisateurs ou du public.
                </li>
              </ul>

              <p className="mt-3">
                Tous nos prestataires de services sont tenus de respecter la
                confidentialité et la sécurité de vos données et de ne les
                utiliser que pour les finalités spécifiées.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                6. Conservation des données
              </h2>
              <p className="mb-3">
                Nous conservons vos données personnelles aussi longtemps que
                nécessaire pour vous fournir nos services et pour les finalités
                définies dans cette politique de confidentialité, à moins qu'une
                période de conservation plus longue ne soit requise ou permise
                par la loi.
              </p>

              <p className="mb-3">
                Si vous supprimez votre compte, nous supprimons ou anonymisons
                vos données personnelles dans un délai raisonnable, sauf si nous
                devons les conserver pour des raisons légales, de résolution des
                litiges, ou pour prévenir la fraude.
              </p>

              <p>
                Les périodes de conservation spécifiques varient en fonction du
                type de données et de leur finalité :
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>
                  Données de compte : conservées tant que votre compte est actif
                </li>
                <li>
                  Messages et contributions au forum : conservés tant que le
                  contenu reste publié sur la plateforme
                </li>
                <li>
                  Données de navigation : généralement conservées pendant 13
                  mois maximum
                </li>
                <li>
                  Correspondances avec notre équipe : conservées jusqu'à 3 ans
                  après notre dernier contact
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                7. Sécurité des données
              </h2>
              <p className="mb-3">
                Nous mettons en œuvre des mesures de sécurité techniques et
                organisationnelles appropriées pour protéger vos données
                personnelles contre la perte, l'accès non autorisé, la
                divulgation, l'altération ou la destruction.
              </p>

              <p>
                Ces mesures comprennent notamment le chiffrement des données,
                des contrôles d'accès stricts, des audits réguliers et la
                formation de notre personnel. Cependant, aucune méthode de
                transmission sur Internet ou de stockage électronique n'est
                totalement sécurisée, et nous ne pouvons garantir une sécurité
                absolue.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                8. Vos droits
              </h2>
              <p className="mb-3">
                Conformément au Règlement Général sur la Protection des Données
                (RGPD), vous disposez des droits suivants concernant vos données
                personnelles :
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Droit d'accès</strong> : vous pouvez demander une
                  copie des données personnelles que nous détenons à votre
                  sujet.
                </li>
                <li>
                  <strong>Droit de rectification</strong> : vous pouvez demander
                  la correction des données inexactes ou incomplètes.
                </li>
                <li>
                  <strong>Droit à l'effacement</strong> : vous pouvez demander
                  la suppression de vos données personnelles dans certaines
                  circonstances.
                </li>
                <li>
                  <strong>Droit à la limitation du traitement</strong> : vous
                  pouvez demander la limitation du traitement de vos données
                  dans certaines circonstances.
                </li>
                <li>
                  <strong>Droit à la portabilité des données</strong> : vous
                  pouvez recevoir vos données dans un format structuré et les
                  transférer à un autre responsable du traitement.
                </li>
                <li>
                  <strong>Droit d'opposition</strong> : vous pouvez vous opposer
                  au traitement de vos données dans certaines circonstances.
                </li>
                <li>
                  <strong>Droit de retirer votre consentement</strong> : lorsque
                  le traitement est basé sur votre consentement, vous pouvez le
                  retirer à tout moment.
                </li>
              </ul>

              <p className="mt-3">
                Pour exercer ces droits, veuillez nous contacter à l'adresse :{" "}
                <a
                  href="mailto:privacy@go-hope.fr"
                  className="text-[#1D5F84] hover:underline"
                >
                  privacy@go-hope.fr
                </a>
                . Nous nous efforcerons de répondre à votre demande dans un
                délai d'un mois.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                9. Transferts internationaux de données
              </h2>
              <p>
                Vos données personnelles peuvent être transférées et traitées
                dans des pays autres que celui dans lequel vous résidez,
                notamment pour l'hébergement et le stockage des données. Ces
                pays peuvent avoir des lois différentes en matière de protection
                des données. Lorsque nous transférons vos données en dehors de
                l'Union européenne ou de l'Espace économique européen, nous nous
                assurons qu'elles bénéficient d'un niveau de protection adéquat,
                en mettant en place des garanties appropriées conformément aux
                exigences légales applicables.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                10. Modifications de notre politique de confidentialité
              </h2>
              <p className="mb-3">
                Nous pouvons mettre à jour cette politique de confidentialité de
                temps à autre en réponse à des évolutions légales, techniques ou
                commerciales. Lorsque nous mettons à jour notre politique de
                confidentialité, nous prendrons les mesures appropriées pour
                vous informer, en fonction de l'importance des changements
                apportés.
              </p>
              <p>
                Nous vous encourageons à consulter régulièrement cette page pour
                prendre connaissance des dernières informations sur nos
                pratiques en matière de confidentialité.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                11. Contact
              </h2>
              <p className="mb-3">
                Si vous avez des questions, des préoccupations ou des demandes
                concernant cette politique de confidentialité ou nos pratiques
                en matière de données, veuillez nous contacter à :
              </p>

              <p className="mb-3">
                GoHope
                <br />
                123 Avenue de l'Espoir
                <br />
                75000 Paris
                <br />
                France
              </p>

              <p className="mb-3">
                Email :{" "}
                <a
                  href="mailto:privacy@go-hope.fr"
                  className="text-[#1D5F84] hover:underline"
                >
                  privacy@go-hope.fr
                </a>
              </p>

              <p>
                Si vous n'êtes pas satisfait de notre réponse à votre demande,
                vous avez le droit d'introduire une réclamation auprès de
                l'autorité de contrôle compétente, en France la Commission
                Nationale de l'Informatique et des Libertés (CNIL).
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialite;
