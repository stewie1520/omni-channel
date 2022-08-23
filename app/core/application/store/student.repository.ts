import { injectable } from "inversify";
import type { AccountEntity } from "~/core/domain/entities/account.entity";
import type { StudentEntity } from "~/core/domain/entities/student.entity";

@injectable()
export abstract class StudentRepository {
  abstract createNewStudentWithAccount(
    student: { firstName: string; lastName: string; avatarUrl?: string },
    account: AccountEntity
  ): Promise<StudentEntity>;

  abstract findById(id: string): Promise<StudentEntity | null>;
}
