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

interface HeightDialog extends DialogProps {
  height?: string;
  onSubmit: (weight: string, measurements: string) => void;
}
export default function HeightDialog({
  height,
  onSubmit,
  ...props
}: HeightDialog) {
  const [value, setValue] = useState<string>();
  const [measurements, setMeasurements] = useState<string>();

  const handleSubmit = () => {
    onSubmit(value!, measurements!);
  };

  useEffect(() => {
    if (height) {
      setValue(height);
    }
  }, [height]);
  return (
    <Dialog {...props}>
      <DialogContent className="text-white bg-[#162329] border-none rounded-lg">
        <DialogHeader>
          <DialogTitle>Height</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center gap-4 text-2xl font-bold">
          <input
            defaultValue={height}
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
            <option className="bg-[#09141A]">cm</option>
            <option className="bg-[#09141A]">ft</option>
          </select>
        </div>
        <DialogFooter>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="w-full bg-white/5 rounded-lg px-4 py-3 active:bg-white/10"
          >
            Input Height
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
