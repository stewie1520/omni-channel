import type { AccountProviderEnum } from "../enums/account-provider.enum";
import { BaseEntity } from "./base.entity";
import type { StudentEntity } from "./student.entity";
import type { TeacherEntity } from "./teacher.entity";
import { UniqueIdentifier } from "./unique-identifier";

export interface AccountEntityProps {
  email: string;
  firstName: string;
  lastName: string;
  password: string | null;
  provider: AccountProviderEnum;
  idOnProvider: string | null;
  createdAt: Date;
  updatedAt: Date;
  student?: StudentEntity;
  teacher?: TeacherEntity;
}

export class AccountEntity extends BaseEntity<AccountEntityProps> {
  get email(): string {
    return this.props.email;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get password(): string | null {
    return this.props.password;
  }

  get provider(): AccountProviderEnum {
    return this.props.provider;
  }

  get idOnProvider(): string | null {
    return this.props.idOnProvider;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get student(): StudentEntity | undefined {
    return this.props.student;
  }

  set student(student: StudentEntity | undefined) {
    this._props.student = student;
  }

  get teacher(): TeacherEntity | undefined {
    return this.props.teacher;
  }

  static create(props: AccountEntityProps, id?: string): AccountEntity {
    return new AccountEntity(props, new UniqueIdentifier(id));
  }
}
