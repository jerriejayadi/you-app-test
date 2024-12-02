import Ellipsis from "../../public/icons/ellipsis";
import AboutCards from "@/components/AboutCards";
import InterestCards from "@/components/InterestCards";
import { cookies } from "next/headers";
import { getProfile } from "@/service/users";
import { calculateAge } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token");
  const profile = await getProfile(access_token?.value!);
  if (!profile.data) {
    redirect(`/login`);
  }

  return (
    <main className="flex min-h-screen flex-col items-start gap-7 px-4 py-9 bg-[#09141A] text-white">
      <div className="flex items-center justify-between w-full">
        <button className="flex gap-0.5  items-center">
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
        <p>@{profile?.data?.username}</p>
        <button>
          <Ellipsis />
        </button>
      </div>

      {/* Preview Cards */}
      <div className="relative overflow-hidden bg-[#162329] rounded-2xl w-full aspect-video flex flex-col items-start justify-end p-4">
        <div className="z-20">
          <p className="font-bold">
            @{profile?.data?.username},{" "}
            {profile?.data?.birthday && (
              <>{calculateAge(profile?.data?.birthday)}</>
            )}
          </p>
          {profile?.data?.name && (
            <>
              <p className="text-xs mt-1">Male</p>
              <div className="flex items-center text-sm mt-2 gap-4">
                <div className="bg-gray-800 px-4 py-2 rounded-full">
                  {profile.data.horoscope}
                </div>
                <div className="bg-gray-800 px-4 py-2 rounded-full">
                  {profile.data.zodiac}
                </div>
              </div>
            </>
          )}
        </div>

        {profile?.data?.name && (
          <>
            <div className="z-10 absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/100 from-0% to-black/20 to-50%" />
            <div className="absolute top-0 left-0 w-full h-full">
              <Image
                alt="profile picture"
                src={`/profile-sample.jpg`}
                width={1920}
                height={1080}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          </>
        )}

        {/* <button className="absolute top-2 right-4 active:bg-white/10 rounded-[100%] p-2 transition-all duration-150">
          <Edit2 className="size-5" />
        </button> */}
      </div>

      {/* About Cards */}
      <div className="w-full flex flex-col gap-4">
        <AboutCards access_token={access_token!.value} profile={profile} />
        <InterestCards access_token={access_token!.value} profile={profile} />
      </div>
    </main>
  );
}
