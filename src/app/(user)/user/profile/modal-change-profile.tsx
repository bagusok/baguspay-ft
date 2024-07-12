"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { globalLoadingAtom, userTokenAtom } from "@/store";
import { useFormik } from "formik";
import { useAtom, useSetAtom } from "jotai";
import toast from "react-hot-toast";

export default function ModalChangeProfile({
  data,
}: {
  data: {
    longName: string;
    username: string;
    email: string;
    phone: string;
  };
}) {
  const setGlobalLoading = useSetAtom(globalLoadingAtom);
  const [userToken, setUserToken] = useAtom(userTokenAtom);

  const form = useFormik({
    initialValues: {
      longName: data.longName,
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      console.log(data);
      setGlobalLoading(true);
      try {
        const data = Object.fromEntries(
          Object.entries(values).filter(([key, value]) => value)
        );

        const res = await axiosIn.post(`${apiUrl}/users/update-profile`, data, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        toast.success(res.data.message);
        setGlobalLoading(false);
        if (res.data.data.updated) {
          toast.success("Profile updated, please relog");
          setUserToken(null);
        }
      } catch (error: any) {
        toast.error(error.response.data.message || "Something went wrong");
        setGlobalLoading(false);
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="py-0.5">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form action="" onSubmit={form.handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Long Name
              </Label>
              <Input
                id="longName"
                value={form.values.longName}
                onChange={form.handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={form.values.email}
                onChange={form.handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={form.values.username}
                onChange={form.handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={form.values.phone}
                onChange={form.handleChange}
                className="col-span-3"
              />
            </div>
            <p className="mt-2 text-center text-sm font-semibold">
              Ubah Password
            </p>
            <Label
              htmlFor="username"
              className="text-center text-xs italic text-red-500"
            >
              * Kosongkan jika tidak ingin mengubah password
            </Label>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                value={form.values.password}
                onChange={form.handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                value={form.values.confirmPassword}
                onChange={form.handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
