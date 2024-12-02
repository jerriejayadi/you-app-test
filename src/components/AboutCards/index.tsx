"use client";

import { ChangeEvent, useEffect, useState } from "react";
import AboutForm from "../AboutForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "../ui/dialog";
import { PostCreateProfile } from "@/types/Users/PostCreateProfile";
import WeightDialog from "../AboutForm/WeightDialog";
import Input from "../Input";
import Select from "../Select";
import Image from "next/image";
import HeightDialog from "../AboutForm/HeightDialog";
import { postCreateProfile } from "@/service/users";
import { GetProfile } from "@/types/Users/GetProfile";
import moment from "moment";
import { useRouter } from "next/navigation";
import Edit2 from "../../../public/icons/edit";

interface AboutCardsProps {
  profile?: GetProfile;
  access_token: string;
}

export default function AboutCards({ profile, access_token }: AboutCardsProps) {
  const router = useRouter();

  const [edit, setEdit] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const [image, setImage] = useState<string>();
  const [zodiac, setZodiac] = useState<string>("");
  const [horoscope, setHoroscope] = useState<string>("");
  const [weightModal, setWeightModal] = useState<boolean>(false);
  const [heightModal, setHeightModal] = useState<boolean>(false);
  const [aboutForm, setAboutForm] = useState<PostCreateProfile>({
    name: "",
    birthday: "",
    height: 0,
    weight: 0,
  });

  const zodiacSigns = [
    { name: "Capricorn", start: "01-01", end: "01-19" },
    { name: "Aquarius", start: "01-20", end: "02-18" },
    { name: "Pisces", start: "02-19", end: "03-20" },
    { name: "Aries", start: "03-21", end: "04-19" },
    { name: "Taurus", start: "04-20", end: "05-20" },
    { name: "Gemini", start: "05-21", end: "06-20" },
    { name: "Cancer", start: "06-21", end: "07-22" },
    { name: "Leo", start: "07-23", end: "08-22" },
    { name: "Virgo", start: "08-23", end: "09-22" },
    { name: "Libra", start: "09-23", end: "10-22" },
    { name: "Scorpius", start: "10-23", end: "11-21" },
    { name: "Sagittarius", start: "11-22", end: "12-21" },
    { name: "Capricorn", start: "12-22", end: "12-31" },
  ];

  const horoscopes = {
    Aries: "Ram",
    Taurus: "Bull",
    Gemini: "Twins",
    Cancer: "Crab",
    Leo: "Lion",
    Virgo: "Virgin",
    Libra: "Balance",
    Scorpius: "Scorpion",
    Sagittarius: "Archer",
    Capricorn: "Goat",
    Aquarius: "Water Bearer",
    Pisces: "Fish",
  };

  const getZodiacAndHoroscope = (inputDate: string) => {
    if (!inputDate) return;

    const [year, month, day] = inputDate.split("-");
    const formattedDate = `${month}-${day}`;

    const sign =
      zodiacSigns.find(
        (zodiac) => formattedDate >= zodiac.start && formattedDate <= zodiac.end
      ) || zodiacSigns[0]; // Capricorn (for edge case of December 31)

    setZodiac(sign.name);
    setHoroscope(horoscopes[sign.name as keyof typeof horoscopes]);
  };

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

  const handleSubmit = () => {
    const payload: PostCreateProfile = { ...aboutForm, interests: [] };
    postCreateProfile(payload, access_token).then(() => {
      setEdit(false);
      router.refresh();
    });
  };

  useEffect(() => {
    getZodiacAndHoroscope(aboutForm.birthday);
  }, [aboutForm.birthday]);

  useEffect(() => {
    setAboutForm({
      birthday: profile?.data?.birthday ?? "",
      height: profile?.data?.height ?? 0,
      name: profile?.data?.name ?? "",
      weight: profile?.data?.weight ?? 0,
    });
  }, [profile]);
  return (
    <div className="relative bg-[#162329] rounded-2xl w-full  flex flex-col items-start px-7 pb-6 pt-4">
      {edit ? (
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="text-xs absolute top-2 right-4 active:bg-white/10 rounded-lg p-2 transition-all duration-150"
        >
          <>Save & Update</>
        </button>
      ) : (
        <button
          onClick={() => {
            setEdit(true);
          }}
          className="text-xs absolute top-2 right-4 active:bg-white/10 rounded-[100%] p-2 transition-all duration-150"
        >
          <Edit2 className="size-5" />
        </button>
      )}

      <p className="font-bold text-sm">About</p>
      {edit ? (
        <div className="w-full mt-8 text-xs">
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

              <input
                onChange={handleImage}
                type="file"
                hidden
                id="upload_image"
              />
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
                  value={aboutForm.name}
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
                  value={aboutForm.birthday}
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
                  value={zodiac}
                  disabled
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-white/35 w-[40%]">Zodiac</label>
                <Input
                  placeholder="Pig"
                  groupClassname="w-[60%]"
                  className="!py-1 text-end accent-white"
                  value={horoscope}
                  disabled
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-white/35 w-[40%]">Height</label>
                <button
                  onClick={() => {
                    setHeightModal(true);
                  }}
                  className={`w-[60%] ${
                    aboutForm.height ? "text-white" : "text-white/50"
                  } flex items-center justify-end py-2 px-4 bg-white/5 rounded-lg active:bg-white/15`}
                >
                  {aboutForm.height ?? "--"}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-white/35 w-[40%]">Weight</label>
                <button
                  onClick={() => {
                    setWeightModal(true);
                  }}
                  className={`w-[60%] ${
                    aboutForm.weight ? "text-white" : "text-white/50"
                  } flex items-center justify-end py-2 px-4 bg-white/5 rounded-lg active:bg-white/15`}
                >
                  {aboutForm.weight ?? "--"}
                </button>
              </div>
            </div>
            <WeightDialog
              weight={aboutForm.weight.toString()}
              open={weightModal}
              onOpenChange={setWeightModal}
              onSubmit={(weight, measurements) => {
                setWeightModal(false);
                setAboutForm((prev) => ({ ...prev, weight: Number(weight) }));
              }}
            />
            <HeightDialog
              height={aboutForm.height.toString()}
              open={heightModal}
              onOpenChange={setHeightModal}
              onSubmit={(height, measurements) => {
                setHeightModal(false);
                setAboutForm((prev) => ({ ...prev, height: Number(height) }));
              }}
            />
          </div>
        </div>
      ) : profile?.data?.name ? (
        <div className="flex flex-col gap-4 mt-6 text-xs">
          <p className="text-white/30">
            Birthday:{" "}
            <span className="text-white/100">
              {moment(profile.data.birthday).format("DD / MM / YYYY")}
            </span>
          </p>
          <p className="text-white/30">
            Horoscope:{" "}
            <span className="text-white/100">{profile.data.horoscope}</span>
          </p>
          <p className="text-white/30">
            Zodiac:{" "}
            <span className="text-white/100">{profile.data.zodiac}</span>
          </p>
          <p className="text-white/30">
            Height:{" "}
            <span className="text-white/100">{profile.data.height} cm</span>
          </p>
          <p className="text-white/30">
            Weight:{" "}
            <span className="text-white/100">{profile.data.weight} kg</span>
          </p>
        </div>
      ) : (
        <p className="font-medium mt-8 text-sm text-white/50 leading-4">
          Add in your your to help others know you better
        </p>
      )}
      <Dialog open={confirmationModal} onOpenChange={setConfirmationModal}>
        <DialogContent className="text-white">
          <DialogHeader>
            <DialogTitle>Save information?</DialogTitle>
            <DialogDescription>
              Are you sure all the information is already inputted correctly?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button></button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
