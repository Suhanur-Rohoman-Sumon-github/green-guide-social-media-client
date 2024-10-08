import React, { useState } from "react";
interface CardData {
  id: number;
  title: string;
  description: string;
}
const SingleUser = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCards, setFilteredCards] = useState<CardData[]>([]);

  const cardData: CardData[] = [
    {
      id: 1,
      title: "React Basics",
      description: "Learn the basics of React.",
    },
    { id: 2, title: "Next.js Guide", description: "A guide to Next.js." },
    {
      id: 3,
      title: "Tailwind CSS",
      description: "Styling with Tailwind CSS.",
    },
    {
      id: 4,
      title: "TypeScript Tips",
      description: "Tips for using TypeScript.",
    },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();

    setSearchQuery(query);

    const filtered = cardData.filter(
      (card) =>
        card.title.toLowerCase().includes(query) ||
        card.description.toLowerCase().includes(query),
    );

    setFilteredCards(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Search for something..."
          type="text"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div
              key={card.id}
              className="p-4 bg-white border rounded-md shadow-md"
            >
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p>{card.description}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SingleUser;
