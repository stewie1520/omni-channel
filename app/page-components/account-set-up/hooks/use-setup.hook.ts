import { useContext } from "react";
import { SetupContext } from "../context/set-up.context";

export const useSetupContext = () => useContext(SetupContext);
