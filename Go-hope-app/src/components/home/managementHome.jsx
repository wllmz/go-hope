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
    <div className="w-full flex flex-col h-full bg-gradient-to-b from-[#B3D7EC] from-0% via-[#E8F3F9] via-50% to-[#fff] to-100%">
      {/* Menu principal */}
      <Menu />

      {/* Contenu principal */}
      <main className="flex-grow flex items-center justify-center relative">
        <div className="w-full">
          {/* Section utilisateur */}
          <div className="p-5">
            <p className="text-xl p-4 pt-6 text-[#0E3043]">
              Bonjour {user?.username} !
            </p>
            <FirstComponentUser />
          </div>

          {/* Section carrousel mobile */}
          <div className="pt-5 pb-5">
            <MobileCarousel />
          </div>

          {/* Section desktop et autres composants */}
          <div className="p-5">
            <DesktopLayout />
            <ThirdComponent />
            <MobileCarouselF />
            <DesktopLayoutF />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
