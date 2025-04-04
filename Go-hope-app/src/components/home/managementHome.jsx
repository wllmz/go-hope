import React from "react";
import FirstComponent from "./detail/first/firstComponent";
import MobileCarousel from "./detail/second/MobileCarousel";
import DesktopLayout from "./detail/second/DesktopLayout";
import MobileCarouselF from "./detail/fourth/MobileCarouselF";
import DesktopLayoutF from "./detail/fourth/DesktopLayoutF";
import ThirdComponent from "./detail/third/thirdComponent";
import FirstComponentUser from "./detail/calendar/calendar";

import Menu from "../layout/menu";

const Home = () => {
  return (
    <div className="w-full flex flex-col h-full">
      {/* Menu principal */}
      <Menu />
      {/* Contenu principal */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full">
          <FirstComponent />
          <FirstComponentUser />
          {/* Afficher le carrousel pour mobile/tablettes */}

          {/* Afficher le layout classique pour desktop */}
          <div className="p-5">
            <MobileCarousel />

            <DesktopLayout />

            <ThirdComponent />
            {/* Afficher le carrousel pour mobile/tablettes */}
            <MobileCarouselF />
            {/* Afficher le layout classique pour desktop */}
            <DesktopLayoutF />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
