import type { SetupAction, SetupState } from "./set-up.context";
import { ActionType } from "./set-up.context";
import type React from "react";

export const backToStepRole = (dispatch: React.Dispatch<SetupAction>) => {
  dispatch({
    type: ActionType.CHANGE_STEP,
    payload: {
      step: 0,
      who: null,
    },
  });
};

export const toStepProfile = (dispatch: React.Dispatch<SetupAction>) => {
  dispatch({
    type: ActionType.CHANGE_STEP,
    payload: {
      step: 1,
    },
  });
};

export const toStepVerification = (dispatch: React.Dispatch<SetupAction>) => {
  dispatch({
    type: ActionType.CHANGE_STEP,
    payload: {
      step: 2,
    },
  });
};

type K = keyof Pick<
  SetupState,
  "birthDay" | "selectedCountry" | "gender" | "phone" | "bio"
>;

export function changeProfile(
  dispatch: React.Dispatch<SetupAction>,
  payload: { [Property in K]?: SetupState[Property] }
) {
  dispatch({
    type: ActionType.PROFILE_CHANGED,
    payload,
  });
}
