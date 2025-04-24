/**
 * Données centralisées pour les slides des news
 * Utilisé par DesktopLayoutF et MobileCarouselF
 */

import famille from "../../../../assets/famille.png";

export const slideData = [
  {
    image: famille,
    title: "Les news Gohope",
    description:
      "Suivez les aventures Gohope, les évènements, les actualités et les nouvelles de la communauté.",
    buttonText: "Voir",
    link: "/news",
    cardColor: "bg-[#FFF6ED]",
    buttonColor: "bg-[#F1731F] hover:bg-[#F5943A]",
    titleColor: "text-[#1D5F84]",
    textColor: "text-[#0E3043]",
  },
  {
    image: famille,
    title: "Les news de nos partenaires",
    description:
      "Restez à jour sur les actualités, événements et informations de nos partenaires.",
    buttonText: "Voir",
    link: "/partenaires",
    cardColor: "bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]",
    buttonColor: "bg-[#F1731F] hover:bg-[#F5943A]",
    titleColor: "text-[#1D5F84]",
    textColor: "text-[#0E3043]",
  },
  {
    image: famille,
    title: "Les news santé",
    description:
      "Suivez l’actualité santé et recevez chaque jour conseils et infos clés.",
    buttonText: "Voir",
    link: "/sante",
    cardColor: "bg-gradient-to-b from-[#1D5F84] to-[#FDFDFD]",
    buttonColor: "bg-[#F1731F]",
    titleColor: "text-[#1D5F84]",
    textColor: "text-[#0E3043]",
  },
];
