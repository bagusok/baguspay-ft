import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const isSidebarOpen = atom<boolean>(false);

export const themeAtom = atomWithStorage<Theme>("theme", "light");

type Theme = "dark" | "light" | "system";
