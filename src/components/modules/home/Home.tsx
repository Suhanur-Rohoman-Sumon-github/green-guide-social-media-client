"use client";
import React, { useState } from "react";

import AllPosts from "./AllPosts";
import Posts from "./PostsHeader";

const Home = () => {
  const [activeTab, setActiveTab] = useState("For-You");
  const renderTabContent = () => {
    switch (activeTab) {
      case "For-You":
        return <AllPosts />;

      default:
        return <AllPosts />;
    }
  };

  return (
    <div>
      <Posts />
      {renderTabContent()}
    </div>
  );
};

export default Home;
