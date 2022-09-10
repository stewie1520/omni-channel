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

export const toStepVerification = (
  dispatch: React.Dispatch<SetupAction>,
  otpId: string,
  otpExpiredAt: Date,
  otpProvider: string
) => {
  dispatch({
    type: ActionType.CHANGE_STEP,
    payload: {
      step: 2,
      otpId,
      otpExpiredAt,
      otpProvider,
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

export function setLoading(
  dispatch: React.Dispatch<SetupAction>,
  loading: boolean
) {
  dispatch({
    type: ActionType.SET_LOADING,
    payload: {
      loading,
    },
  });
}
