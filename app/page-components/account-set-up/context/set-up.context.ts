import type React from "react";
import { createContext } from "react";
import { reducer } from "~/libs/reducer";
import type { Country } from "../types";

export type SetupState = {
  step: number;
  email: string;
  bio: string | null;
  who: "student" | "teacher" | null;
  gender: "female" | "male" | "other";
  firstName: string;
  phone: string;
  avatarUrl: string | null;
  lastName: string;
  birthDay: Date;
  countries: Country[];
  otp: string;
  selectedCountry: string;
};

export const defaultSetupState: SetupState = {
  step: 2,
  who: "student",
  email: "",
  otp: "",
  bio: null,
  gender: "female",
  avatarUrl: null,
  firstName: "",
  lastName: "",
  phone: "",
  birthDay: new Date(),
  countries: [],
  selectedCountry: "",
};

export type SetUpContextType = {
  state: SetupState;
  dispatch: React.Dispatch<SetupAction>;
};

export const SetupContext = createContext<SetUpContextType>({
  state: defaultSetupState,
  dispatch: () => {},
});

export enum ActionType {
  CHANGE_STEP = "CHANGE_STEP",
  CHOSE_WHO = "CHOSE_WHO",
  PROFILE_CHANGED = "PROFILE_CHANGED",
  OTP_CHANGED = "OTP_CHANGED",
}

export type SetupAction = {
  type: ActionType;
  payload: Partial<SetupState>;
};

export const setupReducer = reducer<SetupState>({
  [ActionType.CHANGE_STEP]: (state, payload) => {
    state.step = payload.step!;
    if (payload.who) {
      state.who = payload.who;
    }
  },
  [ActionType.CHOSE_WHO]: (state, payload) => {
    state.step = 1;
    state.who = payload.who!;
  },
  [ActionType.OTP_CHANGED]: (state, payload) => {
    state.otp = payload.otp!;
  },
  [ActionType.PROFILE_CHANGED]: (state, payload) => {
    if (payload.birthDay) {
      state.birthDay = payload.birthDay;
    }

    if (payload.selectedCountry) {
      state.selectedCountry = payload.selectedCountry;
    }

    if (payload.bio) {
      state.bio = payload.bio;
    }

    if (payload.gender) {
      state.gender = payload.gender;
    }

    if (payload.phone) {
      state.phone = payload.phone;
    }

    if (payload.bio) {
      state.bio = payload.bio;
    }
  },
});
