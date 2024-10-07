"use client";
import React, { useState } from "react";

import AccountSettings from "@/src/components/modules/settings/AccountSettings";
import NotificationSettings from "@/src/components/modules/settings/NotificationSettings";
import PrivacySettings from "@/src/components/modules/settings/PrivacySettings";
import SettingsSidebar from "@/src/components/modules/settings/SettingsSidebar";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>("account");
  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettings />;
      case "privacy":
        return <PrivacySettings />;
      case "notifications":
        return <NotificationSettings />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="flex  border mt-32">
      {/* Sidebar */}
      <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content */}
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>
        <div className=" p-6 rounded-lg shadow-lg">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Settings;
