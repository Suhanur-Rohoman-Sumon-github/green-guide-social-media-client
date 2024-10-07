"use client";
import React, { useState } from "react";

import { AllNavbar } from "../../ui/AllsideNavbar";

import AllPosts from "./AllPosts";
import AllFollowerPost from "./AllFollowerPost";
import Posts from "./PostsHeader";

const Home = () => {
  const [activeTab, setActiveTab] = useState("For-You");
  const renderTabContent = () => {
    switch (activeTab) {
      case "For-You":
        return <AllPosts />;
      case "Following":
        return <AllFollowerPost />;

      default:
        return <AllPosts />;
    }
  };

  return (
    <div>
      <AllNavbar />
      <Posts />
      {renderTabContent()}
    </div>
  );
};

export default Home;
