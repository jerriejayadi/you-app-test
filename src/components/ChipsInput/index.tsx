import { useState } from "react";

interface ChipsInputProps {
  placeholder?: string;
}

const ChipsInput: React.FC<ChipsInputProps> = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<string[]>([]);

  // Function to handle space press and add word to chips
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // When the user presses the space bar, add the chip
    if ((e.key === " " || e.key === "Enter") && inputValue.trim() !== "") {
      e.preventDefault(); // Prevent space from being added to input
      setChips((prevChips) => [...prevChips, inputValue.trim()]); // Add word to chips
      setInputValue(""); // Clear input after adding the chip
    }
  };

  // Function to remove a chip
  const removeChip = (chip: string) => {
    setChips((prevChips) => prevChips.filter((c) => c !== chip));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      {chips.map((chip, index) => (
        <div
          key={index}
          className="flex items-center gap-1 px-3 py-1 bg-white/10 text-white rounded-lg"
        >
          {chip}
          <button
            className="text-xs font-bold"
            onClick={() => removeChip(chip)}
            aria-label="Delete chip"
          >
            x
          </button>
        </div>
      ))}
      <span className="absolute opacity-0 whitespace-nowrap">{inputValue}</span>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="px-3 py-1 rounded-md focus:outline-none bg-transparent shrink w-full "
      />
    </div>
  );
};

export default ChipsInput;
