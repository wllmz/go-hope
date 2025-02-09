import React from "react";
import FirstComponent from "./detail/first/firstComponent";
import MobileCarousel from "./detail/second/MobileCarousel";
import DesktopLayout from "./detail/second/DesktopLayout";
import MobileCarouselF from "./detail/fourth/MobileCarouselF";
import DesktopLayoutF from "./detail/fourth/DesktopLayoutF";
import ThirdComponent from "./detail/third/thirdComponent";

import Menu from "../layout/menu";

const Home = () => {
  return (
    <div className="w-full flex flex-col h-full">
      {/* Menu principal */}
      <Menu />
      {/* Contenu principal */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full p-8">
          <FirstComponent />
          {/* Afficher le carrousel pour mobile/tablettes */}
          <MobileCarousel />
          {/* Afficher le layout classique pour desktop */}
          <DesktopLayout />
          <ThirdComponent />
          {/* Afficher le carrousel pour mobile/tablettes */}
          <MobileCarouselF />
          {/* Afficher le layout classique pour desktop */}
          <DesktopLayoutF />
        </div>
      </main>
    </div>
  );
};

export default Home;
