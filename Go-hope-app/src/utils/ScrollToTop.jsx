import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Composant qui défile automatiquement vers le haut de la page
 * à chaque changement de route.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Défiler vers le haut immédiatement
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    // Utiliser un délai pour s'assurer que le défilement fonctionne même après animation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });

      // Utiliser requestAnimationFrame pour s'assurer que le scroll est effectué après le rendu
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }, 100);
  }, [pathname]);

  return null; // Ce composant ne rend rien
};

export default ScrollToTop;
