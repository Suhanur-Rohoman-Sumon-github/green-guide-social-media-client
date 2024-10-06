// components/SettingsSidebar.tsx
import Link from "next/link";
import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="w-64  shadow-lg p-6 border-r-1">
      <ul className="space-y-4">
        <Link href={"/"}>
          <li
            className={`cursor-pointer p-2 rounded-lg  flex items-center gap-2`}
          >
            <FaLongArrowAltLeft /> Back To home
          </li>
        </Link>
        <li
          onClick={() => setActiveTab("account")}
          className={`cursor-pointer p-2 rounded-lg `}
        >
          ⚙️ Account Settings
        </li>
        <li
          onClick={() => setActiveTab("privacy")}
          className={`cursor-pointer p-2 rounded-lg $`}
        >
          🔒 Privacy & Security
        </li>
        <li
          onClick={() => setActiveTab("notifications")}
          className={`cursor-pointer p-2 rounded-lg $`}
        >
          🔔 Notifications
        </li>
      </ul>
    </div>
  );
};

export default SettingsSidebar;
