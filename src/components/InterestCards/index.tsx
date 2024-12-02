"use client";

import { useState } from "react";
import AddInterests from "./AddInterests";
import { GetProfile } from "@/types/Users/GetProfile";
import { useRouter } from "next/navigation";
import Edit2 from "../../../public/icons/edit";

interface InterestCardsProps {
  profile: GetProfile;
  access_token: string;
}

export default function InterestCards({
  profile,
  access_token,
}: InterestCardsProps) {
  const router = useRouter();
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <div className="relative bg-[#162329] rounded-2xl w-full  flex flex-col items-start px-7 pb-6 pt-4">
      <button
        onClick={() => {
          setEdit(true);
        }}
        className="absolute top-2 right-4 active:bg-white/10 rounded-[100%] p-2 transition-all duration-150"
      >
        <Edit2 className="size-4 fill-none" />
      </button>
      <p className="font-bold text-sm">Interest</p>
      <div className="mt-8 flex items-center flex-wrap gap-3 text-sm">
        {profile?.data?.interests?.length > 0 ? (
          profile?.data?.interests?.map((rows) => (
            <p
              className="w-fit px-4 py-2 bg-white/5 rounded-full font-semibold"
              key={`interests-${rows}`}
            >
              {rows}
            </p>
          ))
        ) : (
          <p className="font-medium text-sm text-white/50 leading-4">
            Add in your interest to find a better match
          </p>
        )}
      </div>

      <AddInterests
        access_token={access_token}
        profile={profile}
        open={edit}
        onClose={() => {
          setEdit(false);
        }}
        onFinishSubmit={() => {
          setEdit(false);
          router.refresh();
        }}
      />
    </div>
  );
}
