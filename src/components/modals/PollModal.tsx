import React, { ReactElement, ReactNode, useState } from "react";
import GGModal from "./GGModal";
import { CgPoll } from "react-icons/cg"; // Import the icon if not already done

interface PollModalProps {
  buttons: ReactNode; // Accepts any React node as buttons
}

const PollModal: React.FC<PollModalProps> = ({ buttons }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pollTitle, setPollTitle] = useState("");
  const [options, setOptions] = useState([""]); // Initial empty option
  const [duration, setDuration] = useState("1d"); // Default duration (1 day)

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the poll to your API
    console.log({ pollTitle, options, duration });
  };

  return (
    <GGModal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      buttonText={buttons}
      sizes="3xl"
      isPoll={true}
    >
      <form onSubmit={handleSubmit} className="p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Create a Poll</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Poll Title</label>
          <input
            type="text"
            value={pollTitle}
            onChange={(e) => setPollTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Poll Options</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="ml-2 text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addOption} className="text-blue-500">
            Add Option
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Poll Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="1d">1 Day</option>
            <option value="3d">3 Days</option>
            <option value="1w">1 Week</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Poll
        </button>
      </form>
    </GGModal>
  );
};

export default PollModal;
