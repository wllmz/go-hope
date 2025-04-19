import React from "react";
import FirstComponent from "./detail/first/firstComponent";
import MobileCarousel from "./detail/second/MobileCarousel";
import DesktopLayout from "./detail/second/DesktopLayout";
import MobileCarouselF from "./detail/fourth/MobileCarouselF";
import DesktopLayoutF from "./detail/fourth/DesktopLayoutF";
import ThirdComponent from "./detail/third/thirdComponent";
import FirstComponentUser from "./detail/first/firstComponentUser";
import { useUserInfo } from "../../hooks/user/useUserInfo";

import Menu from "../layout/menu";

const Home = () => {
  const { user } = useUserInfo();
  return (
    <div className="w-full flex flex-col h-full">
      {/* Background gradient fixe */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#B3D7EC] from-0% via-[#E8F3F9] via-50% to-[#fff] to-100% -z-10" />

      {/* Menu principal */}
      <Menu />

      {/* Contenu principal */}
      <main className="flex-grow flex items-center justify-center relative">
        <div className="w-full">
          <div className="p-5">
            <p className="text-xl p-4 pt-6 text-[#0E3043]">
              Bonjour {user?.username} !{" "}
            </p>
            {/* <FirstComponent /> */}

            <FirstComponentUser />
          </div>
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
