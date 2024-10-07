"use client";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";
const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const cards = [
    {
      id: 1,
      heading: "Pro",
      para: "1 - 2 users",
      rate: 5,
      description: [
        "Advanced user analytics",
        "Customizable profile themes",
        "Priority support",
        "Enhanced security features",
        "Ad-free experience",
        "Access to exclusive content",
        "Integration with third-party apps",
      ],
      button: "Start Pro",
    },
    {
      id: 2,
      heading: "Team",
      para: "Infinite users",
      rate: 12,
      description: [
        "Team collaboration tools",
        "Enhanced analytics dashboard",
        "Dedicated account manager",
        "Customizable community guidelines",
        "Multiple admin roles",
        "Increased storage for media",
        "Advanced reporting features",
      ],
      button: "Start Team",
    },
    {
      id: 3,
      heading: "Enterprise",
      para: "Infinite users",
      rate: 48,
      description: [
        "Enterprise-level security protocols",
        "Custom API access",
        "Dedicated server support",
        "Branding options for your community",
        "Advanced user engagement tools",
        "Real-time analytics",
        "Priority feature requests",
      ],
      button: "Enterprise",
    },
  ];

  return (
    <div className="mt-8 mx-auto">
      <div className=" ">
        <h1 className=" pb-12 text-center">Upgrade to Premium</h1>
        <div className="flex items-center gap-2 mb-4">
          <Link href={"/"}>
            <FaLongArrowAltLeft />
            <p>back to home</p>
          </Link>
        </div>
      </div>

      {/* Render pricing cards */}
      <div className="flex flex-col lg:flex-row gap-8 justify-center">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`cursor-pointer grid flex-grow  border p-8 `}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-third uppercase">
                {card.heading}
              </h2>
              <p className="text-lg  mt-2">{card.para}</p>
              <p className="text-lg text-third mt-2 font-semibold">
                {card.rate} $
              </p>
              <Button
                className="w-full text-white"
                color="primary"
                variant="bordered"
              >
                {card.button}
              </Button>
              <h3 className="text-xl font-semibold mt-4">Features:</h3>
              {card.description.map((descriptionText, index) => (
                <div key={index} className="flex items-center gap-x-3 mb-2">
                  <TiTick className="text-green-500" />
                  <p className="text-lg ">{descriptionText}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
