import type { Student } from "./computed-student";
import type { Teacher } from "./teacher";

export interface Account {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  student?: Student;
  teacher?: Teacher;
}
