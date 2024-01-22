import { use } from "react";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { atomWithQuery } from "jotai-tanstack-query";
import { apiUrl } from "@/lib/constant";

export const isSidebarOpen = atom<boolean>(false);
export const isSidebarAdminOpen = atom<boolean>(false);

export const themeAtom = atomWithStorage<Theme>("theme", "light");

type Theme = "dark" | "light" | "system";

export const filePickerOpenAtom = atom<boolean>(false);
const filePickerSelectedAtom = atom<string>("");

export const userTokenAtom = atomWithStorage<string | null>("token", null);
export const userAtom = atomWithQuery<User | null>((get) => ({
  queryKey: ["usersAtom", get(userTokenAtom)],
  queryFn: async ({ queryKey: [, userToken] }) => {
    const res = await fetch(`${apiUrl}/users/ping`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    const resJson = await res.json();
    if (resJson.statusCode == 200) {
      return resJson.data;
    } else {
      return null;
    }
  },
}));
interface User {
  id: string;
  username: string;
  name: string;
  email?: string;
  nohp?: string;
  role: "USER" | "ADMIN";
}
