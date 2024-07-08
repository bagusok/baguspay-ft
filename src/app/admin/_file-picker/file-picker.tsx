"use client";

import { Button } from "@/components/ui/button";
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { userTokenAtom } from "@/store";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useEffect, useId, useState } from "react";
import toast from "react-hot-toast";

function FilePicker({
  openFile,
  setOpenFile,
  onFileSelect,
  selectedFile,
  className,
}: {
  openFile: boolean;
  setOpenFile: (openFile: boolean) => void;
  onFileSelect: (file: string) => void;
  selectedFile: string;
  className?: string;
}) {
  const userToken = useAtomValue(userTokenAtom);
  const [selectedFileId, setSelectedFileId] = useState("");

  const {
    data,
    error,
    isLoading,
    refetch: refetchFilePicker,
  } = useQuery({
    queryKey: ["get-file"],
    queryFn: () =>
      axiosIn
        .get(`${apiUrl}/admin/file-picker/list`, {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => toast.error(err.message)),
  });

  const uploadFile = useMutation({
    mutationKey: ["filepicker-upload"],
    mutationFn: async (file: any) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axiosIn.post(
        `${apiUrl}/admin/file-picker/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.data.statusCode == 200) {
        refetchFilePicker();
        console.log("res", response.data);
        toast.success(response.data.data.message);
        return response.data;
      } else {
        console.log("err");
        toast.error(response.data.message);
      }
    },
  });

  const deleteFile = useMutation({
    mutationKey: ["filepicker-delete"],
    mutationFn: async (id: string) => {
      const response = await axiosIn.post(
        `${apiUrl}/admin/file-picker/delete`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.statusCode == 200) {
        toast.success(response.data.message);
        refetchFilePicker();
        return response.data;
      } else {
        toast.error(response.data.message);
      }
    },
  });

  if (!openFile) return null;

  return (
    <div
      className={`fixed z-50 top-0 right-0 left-0 bottom-0  bg-black/60 inline-flex justify-center items-center p-8 ${className}`}
      onClick={() => setOpenFile(false)}
    >
      <div
        className="md:w-2/3 rounded-lg bg-white h-96 px-5 pb-5 pt-3 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="inline-flex justify-between">
          <div className="inline-flex gap-3">
            <div className="text-2xl font-semibold">File Picker</div>
            <input
              type="file"
              name="file"
              // @ts-ignore
              onChange={(e) => uploadFile.mutate(e.target.files[0])}
            />
          </div>
          <div className="">
            <button
              className="hover:opacity-65"
              onClick={() => setOpenFile(false)}
            >
              <Cross2Icon />
            </button>
          </div>
        </div>
        <div className="mt-4 h-full overflow-y-auto">
          {isLoading && <p className="text-center">Loading...</p>}
          {uploadFile.isPending && (
            <p className="text-center">Uploading File...</p>
          )}
          {deleteFile.isPending && (
            <p className="text-center">Deleting File...</p>
          )}
          {error && <div>Error Ngab</div>}
          <ul className="flex flex-row flex-wrap gap-3 h-20">
            {data &&
              !uploadFile.isPending &&
              !deleteFile.isPending &&
              data?.data?.map((file: any, index: number) => (
                <li key={file?.id ?? index}>
                  <input
                    type="radio"
                    id={file.key}
                    name="file"
                    value={file.url}
                    className="hidden peer"
                    onChange={(e) => {
                      setSelectedFileId(e.target.id);
                      onFileSelect(e.target.value);
                    }}
                  />
                  <label
                    // @ts-ignore
                    htmlFor={file.key}
                    className="inline-flex items-center justify-between w-full p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer   peer-checked:border-primary peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
                  >
                    <Image
                      src={file.url}
                      alt={file.key}
                      width={100}
                      height={100}
                      className="h-20 w-full"
                    />
                  </label>
                </li>
              ))}
          </ul>
        </div>
        <div
          className={cn(
            "h-16 w-full bg-slate-100 inline-flex justify-between items-center px-4",
            {
              hidden: !selectedFileId,
            }
          )}
        >
          <p className="text-sm">
            {selectedFileId
              ? `Selected File: ${selectedFileId}`
              : "No File Selected"}
          </p>
          <div className="inline-flex gap-3">
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                deleteFile.mutate(selectedFileId);
                setSelectedFileId("");
                onFileSelect("");
              }}
            >
              Delete
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={() => setOpenFile(false)}
            >
              Use
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InputFilePicker({
  name,
  defaultValue,
  className,
  onChange,
}: {
  name: string;
  defaultValue?: string;
  className?: string;
  onChange?: (e: { value: string }) => void;
}) {
  const [openFile, setOpenFile] = useState(false);
  const [_selectedFiles, _setSelectedFiles] = useState("");

  const onFileSelect = (file: string) => {
    _setSelectedFiles(file);
    if (onChange) {
      onChange({
        value: file,
      });
    }
  };

  useEffect(() => {
    if (defaultValue) {
      _setSelectedFiles(defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      {!_selectedFiles && (
        <div
          className={`rounded-md inline-flex justify-center items-center border border-dashed border-muted-foreground hover:opacity-60 p-3 ${className}`}
          onClick={() => setOpenFile(true)}
        >
          <p className="text-sm text-center">Upload File Here</p>
        </div>
      )}

      <input type="hidden" name={name} value={_selectedFiles} />

      {_selectedFiles && (
        <Image
          onClick={() => setOpenFile(true)}
          src={_selectedFiles}
          alt="img"
          width={100}
          height={100}
          className={`rounded-md object-cover ${className}`}
        />
      )}

      <FilePicker
        openFile={openFile}
        setOpenFile={setOpenFile}
        onFileSelect={onFileSelect}
        selectedFile={_selectedFiles}
      />
    </>
  );
}
