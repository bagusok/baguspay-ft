import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const isSidebarOpen = atom<boolean>(false);

export const themeAtom = atomWithStorage<Theme>("theme", "dark");

type Theme = "dark" | "light" | "system";
