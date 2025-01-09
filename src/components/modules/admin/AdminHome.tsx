"use client";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import React, { useEffect, useState } from "react";

import { useGetAllUserQuery } from "@/src/hook/user.hook";
import { useGetAllPostQuery } from "@/src/hook/post.hook";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// Define the type for chart data
interface Post {
  title: string;
  likeCount: number;
}

interface User {
  name: string;
  postCount: number;
}

const HomePage: React.FC = () => {
  const { data: AllPosts } = useGetAllPostQuery({ searchTerm: "" });
  const { data: AllUsers } = useGetAllUserQuery();

  const [postChartData, setPostChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });

  const [userChartData, setUserChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (AllPosts && AllPosts.length > 0) {
      setPostChartData({
        labels: AllPosts.map((post: Post) => post.title),
        datasets: [
          {
            label: "Posts",
            data: AllPosts.map((post: Post) => post.likeCount || 0),
            backgroundColor: "#4ADE80",
          },
        ],
      });
    }

   if (AllUsers && AllUsers.length > 0) {
  setUserChartData({
    labels: AllUsers.map((user: User) => user.name),
    datasets: [
      {
        label: "Users",
        data: AllUsers.map((user: User) => user.postCount || 0),
        backgroundColor: "#3B82F6",
        borderColor: "#3B82F6",
        fill: false,
      },
    ],
  });
}


  // Example data for purchases (you can replace it with your actual data)
  const totalPurchases = 100; // Replace with actual data fetching logic

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>

      {/* Cards for Total Users, Total Posts, Total Purchases */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 shadow rounded-lg border  border-gray-500  text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{AllUsers ? AllUsers.length : 0}</p>
        </div>
        <div className="p-4 shadow rounded-lg border  border-gray-500  text-center">
          <h3 className="text-lg font-semibold">Total Posts</h3>
          <p className="text-2xl font-bold">{AllPosts ? AllPosts.length : 0}</p>
        </div>
      </div>

      {/* Charts for Posts and Users */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 shadow rounded-lg border  border-gray-500">
          <h2 className="text-xl font-semibold mb-4">All Posts</h2>
          {postChartData.labels && postChartData.labels.length > 0 ? (
            <Bar data={postChartData} />
          ) : (
            <p>No post data available</p>
          )}
        </div>

        <div className="p-4 shadow rounded-lg border  border-gray-500">
          <h2 className="text-xl font-semibold mb-4">All Users</h2>
          {userChartData.labels && userChartData.labels.length > 0 ? (
            <Line data={userChartData} />
          ) : (
            <p>No user data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
