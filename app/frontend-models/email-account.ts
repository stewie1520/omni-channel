import type { Account } from "./account";
import type { ComputedStudent } from "./computed-student";
import type { Teacher } from "./teacher";

export interface EmailAccount extends Account {
  email: string;
  student?: ComputedStudent;
  teacher?: Teacher;
}
