"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import React, { useState } from "react";
import { FaLongArrowAltLeft, FaVideo } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";

const Chat = () => {
  const users = [
    { id: 1, name: "Alice", profileImg: "https://via.placeholder.com/40" },
    { id: 2, name: "Bob", profileImg: "https://via.placeholder.com/40" },
    { id: 3, name: "Charlie", profileImg: "https://via.placeholder.com/40" },
    { id: 4, name: "Diana", profileImg: "https://via.placeholder.com/40" },
  ];

  const [currentUser, setCurrentUser] = useState(users[0]); // Default to the first user
  const [messages, setMessages] = useState([
    { id: 1, sender: "You", text: "Hey Alice! How are you?", time: "10:00 AM" },
    {
      id: 2,
      sender: "Alice",
      text: "I’m good! How about you?",
      time: "10:01 AM",
    },
    {
      id: 3,
      sender: "You",
      text: "Doing great, thanks for asking!",
      time: "10:02 AM",
    },
    { id: 4, sender: "Alice", text: "What’s new with you?", time: "10:03 AM" },
  ]);

  const switchUser = (
    user: React.SetStateAction<{ id: number; name: string; profileImg: string }>
  ) => {
    setCurrentUser(user);

    // Dummy messages for each user
    const dummyMessages = {
      Alice: [
        {
          id: 1,
          sender: "You",
          text: "Hey Alice! How are you?",
          time: "10:00 AM",
        },
        {
          id: 2,
          sender: "Alice",
          text: "I’m good! How about you?",
          time: "10:01 AM",
        },
      ],
      Bob: [
        {
          id: 1,
          sender: "You",
          text: "Hey Bob, long time no see!",
          time: "11:00 AM",
        },
        {
          id: 2,
          sender: "Bob",
          text: "Yeah, it’s been a while! How’ve you been?",
          time: "11:01 AM",
        },
      ],
      Charlie: [
        { id: 1, sender: "You", text: "Charlie, what's up?", time: "12:00 PM" },
        {
          id: 2,
          sender: "Charlie",
          text: "Not much, just working on some stuff. You?",
          time: "12:01 PM",
        },
      ],
      Diana: [
        {
          id: 1,
          sender: "You",
          text: "Hey Diana! How’s everything?",
          time: "1:00 PM",
        },
        {
          id: 2,
          sender: "Diana",
          text: "Pretty good! Busy as always. You?",
          time: "1:01 PM",
        },
      ],
    };

    setMessages(dummyMessages[user.name] || []);
  };

  const addMessage = () => {
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "You",
        text: "This is a new message!",
        time: "10:10 AM",
      },
    ]);
  };

  return (
    <div className=" mt-32">
      <Link className="flex items-center gap-4 ml-5 my-4" href={"/"}>
        <FaLongArrowAltLeft />
        <p>Back to home</p>
      </Link>
      <div className="flex  font-sans">
        {/* Sidebar for Users */}
        <div className="w-1/4  border  border-gray-500-r overflow-y-auto">
          <div className="p-4 space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => switchUser(user)}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition  justify-between ${
                  user.id === currentUser.id
                    ? "bg-green-500"
                    : "border  border-gray-500"
                }`}
              >
                <div className="flex items-center ">
                  <img
                    src={user.profileImg}
                    alt={`${user.name}'s profile`}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <span className="text-lg">{user.name}</span>
                </div>
                <div>
                  <span className="text-green-500 text-2xl">.</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col border  border-gray-500">
          {/* Header */}
          <div className="p-4 flex items-center justify-between border  border-gray-500">
            <h2 className="text-xl font-semibold">{currentUser.name}</h2>
            <div className="flex items-center gap-4">
              <span>
                <IoMdCall />
              </span>
              <span>
                <FaVideo />
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 ">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-sm ${
                    message.sender === "You"
                      ? "bg-green-500 "
                      : "border  border-gray-500"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs  mt-1">{message.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4  border  border-gray-500-t flex items-center space-x-4">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border  border-gray-500 rounded-lg px-4 py-2 focus:outline-none"
            />
            <Button
              onClick={addMessage}
              variant="shadow"
              className="bg-green-500"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
