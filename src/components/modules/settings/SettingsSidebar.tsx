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
          className={`cursor-pointer p-2 rounded-lg `}
          onClick={() => setActiveTab("account")}
        >
          ⚙️ Account Settings
        </li>
        <li
          className={`cursor-pointer p-2 rounded-lg $`}
          onClick={() => setActiveTab("privacy")}
        >
          🔒 Privacy & Security
        </li>
        <li
          className={`cursor-pointer p-2 rounded-lg $`}
          onClick={() => setActiveTab("notifications")}
        >
          🔔 Notifications
        </li>
      </ul>
    </div>
  );
};

export default SettingsSidebar;
