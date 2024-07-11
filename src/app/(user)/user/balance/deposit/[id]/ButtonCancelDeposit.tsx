"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { globalLoadingAtom, userTokenAtom } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ButtonCancelDeposit({
  depositId,
  isHide,
  refetch,
}: {
  depositId: string;
  isHide: boolean;
  refetch: () => void;
}) {
  const userToken = useAtomValue(userTokenAtom);
  const setGlobalLoading = useSetAtom(globalLoadingAtom);
  const router = useRouter();
  const pathname = usePathname();

  const handleCancel = useMutation({
    mutationKey: ["cancel-deposit"],
    mutationFn: () =>
      axiosIn
        .post(
          `${apiUrl}/user/deposit/cancel`,
          {
            depositId,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          refetch();
          return res.data.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          return err.response.data;
        }),
    // your mutation function here
  });

  useEffect(() => {
    if (handleCancel.isPending) {
      setGlobalLoading(true);
    } else {
      setGlobalLoading(false);
    }
  }, [handleCancel]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className={cn("bg-red-500 my-2", {
            hidden: isHide,
          })}
        >
          Cancel
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apa kamu yakin buat batalin deposit ini?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Deposit yang dibatalkan tidak bisa dikembalikan. Tapi tenang kamu
            bisa buat lagi kok.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleCancel.mutate()}>
            Continue
          </AlertDialogCancel>
          <AlertDialogAction>Cancel</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
