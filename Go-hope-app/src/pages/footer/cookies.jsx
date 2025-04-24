import React from "react";
import Menu from "../../components/layout/menu";

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Menu />
      <div className="container mx-auto px-8 py-8 flex-grow">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-[#1D5F84] mb-6">
            Politique de cookies
          </h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                Qu'est-ce qu'un cookie ?
              </h2>
              <p className="mb-2">
                Un cookie est un petit fichier texte stocké sur votre
                ordinateur, tablette ou smartphone lorsque vous visitez un site
                web. Les cookies sont largement utilisés pour faire fonctionner
                les sites web ou les rendre plus efficaces, ainsi que pour
                fournir des informations aux propriétaires du site.
              </p>
              <p>
                Les cookies permettent à un site web de vous reconnaître, de se
                souvenir de vos préférences et de vous offrir une expérience
                personnalisée, en fonction des informations que vous avez
                fournies ou de votre comportement de navigation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                Comment utilisons-nous les cookies ?
              </h2>
              <p className="mb-2">
                GoHope utilise des cookies pour diverses raisons, notamment pour
                :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Faire fonctionner notre site web correctement</li>
                <li>
                  Mémoriser vos paramètres de connexion et vos préférences
                </li>
                <li>Améliorer la vitesse et la sécurité du site</li>
                <li>
                  Vous permettre de partager des pages sur les réseaux sociaux
                </li>
                <li>Personnaliser notre site en fonction de vos intérêts</li>
                <li>Mesurer l'efficacité de nos services et communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                Types de cookies que nous utilisons
              </h2>

              <div className="mb-4">
                <h3 className="font-medium text-[#1D5F84] mb-2">
                  Cookies strictement nécessaires
                </h3>
                <p>
                  Ces cookies sont essentiels pour vous permettre de naviguer
                  sur notre site web et d'utiliser ses fonctionnalités. Sans ces
                  cookies, nous ne pouvons pas fournir certains services que
                  vous avez demandés, comme l'authentification sécurisée.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-[#1D5F84] mb-2">
                  Cookies de performance
                </h3>
                <p>
                  Ces cookies recueillent des informations sur la façon dont les
                  visiteurs utilisent notre site, par exemple quelles pages ils
                  visitent le plus souvent et s'ils reçoivent des messages
                  d'erreur. Ces cookies ne collectent pas d'informations qui
                  identifient un visiteur.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-[#1D5F84] mb-2">
                  Cookies de fonctionnalité
                </h3>
                <p>
                  Ces cookies permettent au site web de se souvenir des choix
                  que vous faites (comme votre nom d'utilisateur, votre langue
                  ou la région dans laquelle vous vous trouvez) et de fournir
                  des fonctionnalités améliorées et plus personnelles.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-[#1D5F84] mb-2">
                  Cookies de ciblage ou publicitaires
                </h3>
                <p>
                  Ces cookies sont utilisés pour diffuser des publicités plus
                  pertinentes pour vous et vos intérêts. Ils sont également
                  utilisés pour limiter le nombre de fois où vous voyez une
                  publicité et pour mesurer l'efficacité des campagnes
                  publicitaires.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                Comment gérer vos cookies
              </h2>
              <p className="mb-3">
                Vous pouvez contrôler et/ou supprimer les cookies comme vous le
                souhaitez. Vous pouvez supprimer tous les cookies déjà présents
                sur votre ordinateur et vous pouvez configurer la plupart des
                navigateurs pour qu'ils ne les acceptent pas. Toutefois, si vous
                faites cela, vous devrez peut-être ajuster manuellement
                certaines préférences chaque fois que vous visiterez un site, et
                certains services et fonctionnalités pourraient ne pas
                fonctionner.
              </p>
              <p>
                Pour plus d'informations sur la gestion des cookies dans votre
                navigateur, veuillez consulter les liens suivants :
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1D5F84] hover:underline"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/fr/kb/protection-renforcee-contre-pistage-firefox-ordinateur"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1D5F84] hover:underline"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1D5F84] hover:underline"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/fr-fr/help/17442/windows-internet-explorer-delete-manage-cookies"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1D5F84] hover:underline"
                  >
                    Internet Explorer
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1D5F84] hover:underline"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                Modifications de notre politique de cookies
              </h2>
              <p>
                Nous nous réservons le droit de modifier cette politique de
                cookies à tout moment. Tout changement apporté à cette politique
                sera publié sur cette page. Nous vous encourageons à consulter
                régulièrement cette page pour vous tenir informé de notre
                utilisation des cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-3">
                Nous contacter
              </h2>
              <p>
                Si vous avez des questions concernant notre utilisation des
                cookies, veuillez nous contacter à l'adresse suivante :{" "}
                <a
                  href="mailto:contact.gohope@gmail.com-hope.fr"
                  className="text-[#1D5F84] hover:underline"
                >
                  contact.gohope@gmail.com-hope.fr
                </a>
              </p>
            </section>

            <div className="text-sm text-gray-500 mt-8">
              <p>
                Dernière mise à jour :{" "}
                {new Date().toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
