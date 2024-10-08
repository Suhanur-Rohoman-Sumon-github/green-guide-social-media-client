import React from "react";

import SmallScreenSidebar from "@/src/components/modules/home/SmallScreenSidebar";
import { AllNavbar } from "@/src/components/ui/AllsideNavbar";
import AdminSidebar from "@/src/components/modules/admin/AdminSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="grid grid-cols-12 ">
        <AllNavbar />
        <div className="md:col-span-2 col-span-4 hidden md:block   mt-24  pl-8 pb-8 ">
          <AdminSidebar />
        </div>
        <div className="md:col-span-2 col-span-2 md:hidden block mt-24">
          <SmallScreenSidebar />
        </div>
        <div className="md:col-span-9 ml-14 col-span-10 mt-24 border">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
