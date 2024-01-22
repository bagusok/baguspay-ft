"use client";

import { filePickerOpenAtom } from "@/store";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";

export default function FilePicker() {
  const [openFile, setOpenFile] = useAtom(filePickerOpenAtom);

  if (!openFile) return null;

  return (
    <div
      className="fixed z-50 top-0 right-0 left-0 bottom-0  bg-black/60 inline-flex justify-center items-center p-8"
      onClick={() => setOpenFile(false)}
    >
      <div
        className="md:w-2/3 rounded-lg bg-white h-96 px-5 pb-5 pt-3 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="inline-flex justify-between">
          <div className="text-2xl font-semibold">File Picker</div>
          <div className="">
            <button
              className="hover:opacity-65"
              onClick={() => setOpenFile(false)}
            >
              <Cross2Icon />
            </button>
          </div>
        </div>
        <button onClick={() => console.log("asjsksjkj")}>dhdhjkd</button>
      </div>
    </div>
  );
}
