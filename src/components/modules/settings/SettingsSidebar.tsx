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
    <div className="w-64 shadow-lg p-6 border-r-1">
      <ul className="space-y-4">
        <Link href={"/"}>
          <li className="flex items-center gap-2">
            <button className="cursor-pointer p-2 rounded-lg flex items-center gap-2">
              <FaLongArrowAltLeft /> Back To home
            </button>
          </li>
        </Link>
        <li>
          <button
            className="cursor-pointer p-2 rounded-lg w-full text-left"
            onClick={() => setActiveTab("account")}
          >
            ⚙️ Account Settings
          </button>
        </li>
        <li>
          <button
            className="cursor-pointer p-2 rounded-lg w-full text-left"
            onClick={() => setActiveTab("privacy")}
          >
            🔒 Privacy & Security
          </button>
        </li>
        <li>
          <button
            className="cursor-pointer p-2 rounded-lg w-full text-left"
            onClick={() => setActiveTab("notifications")}
          >
            🔔 Notifications
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SettingsSidebar;
