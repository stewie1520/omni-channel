import _pick from "lodash/pick";
import type React from "react";
import { createContext } from "react";
import type { Country } from "../types";

export type SetupState = {
  step: number;
  email: string;
  who: "student" | "teacher" | null;
  firstName: string;
  avatarUrl: string | null;
  lastName: string;
  birthDay: Date;
  countries: Country[];
};

export const defaultSetupState: SetupState = {
  step: 1,
  who: "student",
  email: "",
  avatarUrl: null,
  firstName: "",
  lastName: "",
  birthDay: new Date(),
  countries: [],
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
  CHOSE_WHO = "CHOOSED_WHO",
  PROFILE_CHANGED = "PROFILE_CHANGED",
}

export type SetupAction = {
  type: ActionType;
  payload: Partial<SetupState>;
};

type SetupReducer = (state: SetupState, action: SetupAction) => SetupState;

export const setupReducer: SetupReducer = (state, action) => {
  switch (action.type) {
    case ActionType.CHOSE_WHO:
      return {
        ...state,
        step: 1,
        who: action.payload.who,
      } as SetupState;
    case ActionType.CHANGE_STEP:
      return {
        ...state,
        ...action.payload,
      } as SetupState;
    case ActionType.PROFILE_CHANGED:
      const profileFields: Array<keyof SetupState> = ["birthDay"];
      return {
        ...state,
        ..._pick(action.payload, profileFields),
      };
    default:
      return state;
  }
};
