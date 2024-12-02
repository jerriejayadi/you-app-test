import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(dateOfBirth: string): number {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  // Calculate the age
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust if the current date is before the birth date this year
  const isBeforeBirthdayThisYear =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate());

  if (isBeforeBirthdayThisYear) {
    age--;
  }

  return age;
}
