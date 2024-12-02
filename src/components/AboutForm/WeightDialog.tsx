"use client";
import { DialogProps } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState } from "react";

interface WeightDialog extends DialogProps {
  weight?: string;
  onSubmit: (weight: string, measurements: string) => void;
}
export default function WeightDialog({
  weight,
  onSubmit,
  ...props
}: WeightDialog) {
  const [value, setValue] = useState<string>();
  const [measurements, setMeasurements] = useState<string>();

  const handleSubmit = () => {
    onSubmit(value!, measurements!);
  };

  useEffect(() => {
    if (weight) {
      setValue(weight);
    }
  }, [weight]);
  return (
    <Dialog {...props}>
      <DialogContent className="text-white bg-[#162329] border-none rounded-lg">
        <DialogHeader>
          <DialogTitle>Weight</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center gap-4 text-2xl font-bold">
          <input
            defaultValue={weight}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type="number"
            className="border-b  bg-transparent focus:outline-none w-16  text-center aspect-square "
          />
          <select
            onChange={(e) => {
              setMeasurements(e.target.value);
            }}
            className="bg-transparent  aspect-square"
          >
            <option className="bg-[#09141A]">kg(s)</option>
            <option className="bg-[#09141A]">lb(s)</option>
          </select>
        </div>
        <DialogFooter>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="w-full bg-white/5 rounded-lg px-4 py-3 active:bg-white/10"
          >
            Input Weight
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
