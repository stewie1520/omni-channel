import type React from "react";
import type { SetupAction } from "./set-up.context";
import { ActionType } from "./set-up.context";

export const backToStepRole = (dispatch: React.Dispatch<SetupAction>) => {
  dispatch({
    type: ActionType.CHANGE_STEP,
    payload: {
      step: 0,
      who: null,
    },
  });
};

export const changeBirthDay = (dispatch: React.Dispatch<SetupAction>, birthDay: Date) => {
  dispatch({
    type: ActionType.PROFILE_CHANGED,
    payload: {
      birthDay
    }
  })
}
