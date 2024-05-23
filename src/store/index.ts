import { use } from "react";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { atomWithQuery } from "jotai-tanstack-query";
import { apiUrl } from "@/lib/constant";
import { UserPermission } from "@/types/UserPermission";
import { generateDeviceId, generateSignature } from "@/lib/utils";
import { axiosIn } from "@/lib/axios";

export const isSidebarOpen = atom<boolean>(false);
export const isSidebarAdminOpen = atom<boolean>(false);

export const themeAtom = atomWithStorage<Theme>("theme", "light");

type Theme = "dark" | "light" | "system";

export const filePickerOpenAtom = atom<boolean>(false);

export const userTokenAtom = atomWithStorage<string | null>("token", null);
export const userAtom = atomWithQuery<User>((get) => ({
  queryKey: ["usersAtom", get(userTokenAtom)],
  queryFn: async ({ queryKey: [, userToken] }) => {
    const res = await axiosIn.get(`${apiUrl}/users/ping`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (res.data) {
      return res.data.data;
    }
    return null;
  },
}));

export const deviceIdAtom = atomWithStorage<string | null>("deviceId", null);

interface User {
  id: string;
  username: string;
  name: string;
  email?: string;
  nohp?: string;
  role: UserPermission;
}
