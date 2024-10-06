import CommunityProfileRight from "@/src/components/modules/home/CommunityProfileRight";
import HomeSidebar from "@/src/components/modules/home/HomeSidebar";
import SmallScreenSidebar from "@/src/components/modules/home/SmallScreenSidebar";
import { AllNavbar } from "@/src/components/ui/AllsideNavbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="grid grid-cols-12 ">
        <AllNavbar />
        <div className="md:col-span-2 col-span-4 hidden md:block mt-11">
          <HomeSidebar />
        </div>
        <div className="md:col-span-2 col-span-2 md:hidden block mt-24">
          <SmallScreenSidebar />
        </div>
        <div className="md:col-span-7 col-span-10 mt-24">{children}</div>
        <div className="md:col-span-3 hidden md:block mt-24">
          <CommunityProfileRight />
        </div>
      </div>
    </>
  );
};

export default layout;
