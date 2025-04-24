import calin from "../../../../assets/welcomeStep3.png";
import professeur from "../../../../assets/welcomeStep2.png";
import noue from "../../../../assets/noue.png";

export const slideData = [
  {
    image: calin,
    title: "Accédez au forum",
    description:
      "Accédez aux forums, participez à des discussions et favorisez l'engagement communautaire.",
    buttonText: "Forum",
    link: "/forum",
    cardColor: "bg-[#FFF6ED]",
    borderKey: "orange", // stocke la clé de border
    buttonColor: "bg-[#F1731F] hover:bg-[#F1731F]",
    titleColor: "text-[#1D5F84]",
    textColor: "text-[#0E3043]",
  },
  {
    image: professeur,
    title: "Participez à des échanges avec des patient·e·s aidant·e·s",
    description:
      "Pour les aider dans leurs démarches et dans la compréhension de leur maladie.",
    buttonText: "Faire une demande",
    link: "/demande",
    cardColor: "bg-[#FFF6ED]",
    borderKey: "orange",
    buttonColor: "bg-[#F1731F] hover:bg-[#F1731F]",
    titleColor: "text-[#1D5F84]",
    textColor: "text-[#0E3043]",
  },
  {
    image: noue,
    title: "Regardez des contenus multimédia",
    description: "Masterclass, vidéo-conférences pour aider nos patient·e·s.",
    buttonText: "Fiches",
    link: "/la-sep",
    cardColor: "bg-[#FFF6ED]",
    borderKey: "orange",
    buttonColor: "bg-[#F1731F] hover:bg-[#F1731F]",
    titleColor: "text-[#1D5F84]",
    textColor: "text-[#0E3043]",
  },
];
