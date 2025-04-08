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
      "Accédez aux forums, participez à des discussions et favorisez l'engagement communautaire.",
    buttonText: "Voir",
    link: "/news",
    cardColor: "bg-gradient-to-b from-[#F5943A] to-[#FDFDFD]",
    buttonColor: "bg-[#F1731F] hover:bg-[#F5943A]",
    titleColor: "text-[#1D5F84]",
    textColor: "text-[#0E3043]",
  },
  {
    image: famille,
    title: "Les news de nos partenaires",
    description:
      "Pour les aider dans leurs démarches et dans la compréhension de leur maladie.",
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
    description: "Masterclass, vidéo-conférences pour aider nos patient·e·s.",
    buttonText: "Voir",
    link: "/sante",
    cardColor: "bg-gradient-to-b from-[#1D5F84] to-[#FDFDFD]",
    buttonColor: "bg-[#F1731F] hover:bg-[#F5943A]",
    titleColor: "text-[#1D5F84]",
    textColor: "text-[#0E3043]",
  },
];
