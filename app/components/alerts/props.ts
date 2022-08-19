import type React from "react";

export interface AlertProps {
  short: string;
  children: React.ReactNode | string;
  dismissable: boolean;
}
