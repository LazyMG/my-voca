import { atom } from "recoil";

export const sectionState = atom({
  key: "section",
  default: "RANGE",
});

export const numberState = atom({
  key: "number",
  default: [],
});

export const rangeState = atom({
  key: "range",
  default: 0,
});

export const categoryState = atom({
  key: "category",
  default: {
    mean: 0,
    word: 0,
    page: 1,
  },
});

export const dbWordListState = atom({
  key: "dbWordListState",
  default: [],
});

export const selectedWordListState = atom({
  key: "selectedWordListState",
  default: [],
});

export const loginState = atom({
  key: "userIsLogin",
  default: {
    isLogin: false,
    isLoading: true,
  },
});

export const userState = atom({
  key: "user",
  default: null,
});

export const testState = atom({
  key: "testState",
  default: {},
});
