"use client";
import { ChangeEvent, useState } from "react";
import Input from "../Input";

import Select from "../Select";
import WeightDialog from "./WeightDialog";
import { PostCreateProfile } from "@/types/Users/PostCreateProfile";
import Image from "next/image";

interface AboutFormProps {}

export default function AboutForm() {
  const [image, setImage] = useState<string>();
  const [weightModal, setWeightModal] = useState<boolean>(false);
  const [aboutForm, setAboutForm] = useState<PostCreateProfile>({
    name: "",
    birthday: "",
    height: 0,
    weight: 0,
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      // Create a blob URL for the file
      const blobUrl = URL.createObjectURL(file);
      setImage(blobUrl);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setAboutForm((prevForm) => ({
      ...prevForm,
      [name]:
        name === "height" || name === "weight" ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div>
      <label htmlFor="upload_image" className="flex items-center gap-4">
        {image ? (
          <Image
            alt="uploaded image"
            src={image}
            width={1000}
            height={1000}
            className="size-14 object-cover rounded-2xl"
          />
        ) : (
          <div className="size-14 flex items-center justify-center text-xl bg-white/5 rounded-2xl">
            +
          </div>
        )}

        <p>Add Image</p>

        <input onChange={handleImage} type="file" hidden id="upload_image" />
      </label>
      <div className="flex flex-col gap-3 mt-9">
        <div className="flex items-center justify-between">
          <label className="text-white/35 w-[40%]">Display name:</label>
          <Input
            onChange={handleInputChange}
            name="name"
            placeholder="Enter name"
            groupClassname="w-[60%]"
            className="!py-1 text-end"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-white/35 w-[40%]">Gender:</label>
          <Select
            onChange={handleInputChange}
            name="gender"
            groupClassname="w-[60%]"
            className="!py-1 text-end"
          >
            <option className="bg-[#09141A] k">Male</option>
            <option className="bg-[#09141A]">Female</option>
            <option className="bg-[#09141A]">Rather not say</option>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-white/35 w-[40%]">Birthday</label>
          <Input
            type="date"
            onChange={handleInputChange}
            name="birthday"
            placeholder="Enter name"
            groupClassname="w-[60%]"
            className="!py-1 text-end accent-white"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-white/35 w-[40%]">Horoscope</label>
          <Input
            placeholder="Virgo"
            groupClassname="w-[60%]"
            className="!py-1 text-end accent-white"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-white/35 w-[40%]">Zodiac</label>
          <Input
            placeholder="Pig"
            groupClassname="w-[60%]"
            className="!py-1 text-end accent-white"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-white/35 w-[40%]">Height</label>
          <Input
            type="number"
            placeholder="--"
            groupClassname="w-[60%]"
            className="!py-1 text-end accent-white"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-white/35 w-[40%]">Weight</label>
          <button
            onClick={() => {
              setWeightModal(true);
            }}
            className=" w-[60%] text-white/50 flex items-center justify-end py-2 px-4 bg-white/5 rounded-lg active:bg-white/15"
          >
            --
          </button>
          {/* <Input
            type="number"
            placeholder="--"
            groupClassname="w-[60%]"
            className="!py-1 text-end accent-white"
          /> */}
        </div>
      </div>
      <WeightDialog
        open={weightModal}
        onOpenChange={setWeightModal}
        onSubmit={(weight, measurements) => {
          setWeightModal(false);
          setAboutForm((prev) => ({ ...prev, weight: Number(weight) }));
        }}
      />
    </div>
  );
}
