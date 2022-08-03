import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { RepoType } from "../types/repo";

const { persistAtom } = recoilPersist();

export const pageState = atom<number>({
  key: "pageState",
  default: 1,
});

export const menuValueState = atom<number>({
  key: "menuValueState",
  default: 0,
});

export const languageState = atom<string>({
  key: "languageState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const sortState = atom<string>({
  key: "sortState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const repositoriesState = atom<RepoType[]>({
  key: "repositoriesState",
  default: [],
});
