"use client";
import { useEffect, useState } from "react";
import ChipsInput from "../ChipsInput";
import { GetProfile } from "@/types/Users/GetProfile";
import { putUpdateProfile } from "@/service/users";
import { PostCreateProfile } from "@/types/Users/PostCreateProfile";

interface AddInterestsProps {
  open: boolean;
  onClose: () => void;
  profile: GetProfile;
  access_token: string;
  onFinishSubmit: () => void;
}
export default function AddInterests({
  profile,
  open,
  onClose,
  access_token,
  onFinishSubmit,
}: AddInterestsProps) {
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

  useEffect(() => {
    setChips(profile?.data?.interests ?? []);
  }, [profile]);

  const handleSubmit = () => {
    const payload: PostCreateProfile = {
      birthday: profile.data.birthday,
      height: profile.data.height,
      name: profile.data.name,
      weight: profile.data.weight,
      interests: chips,
    };
    putUpdateProfile(payload, access_token).then(() => {
      onFinishSubmit();
    });
  };
  return (
    <div
      className={`w-full px-4 py-9 bg-custom-radial min-h-screen fixed left-[50%] top-[50%]  translate-x-[-50%] translate-y-[-50%] z-50 ${
        open ? "flex" : "hidden"
      } flex-col`}
    >
      <div className="flex items-center justify-between w-full">
        <button onClick={onClose} className="flex gap-0.5  items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left text-white size-6 shrink-0"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <p>Back</p>
        </button>
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="flex gap-0.5  items-center text-sky-300 disabled:text-gray-400"
          disabled={chips.length === 0}
        >
          Save
        </button>
      </div>
      <div className="mt-20">
        <p className="text-sm text-[#F3EDA6]">Tell everyone about yourself</p>
        <p className="text-white text-xl font-bold mt-3">What interest you?</p>
        <div className="bg-[#D9D9D9]/5 rounded-lg mt-9 px-4 py-2">
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
            <span className="absolute opacity-0 whitespace-nowrap">
              {inputValue}
            </span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="px-3 py-1 rounded-md focus:outline-none bg-transparent shrink w-full "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
