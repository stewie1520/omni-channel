import type { AccountEntity } from "./account.entity";
import { BaseEntity } from "./base.entity";
import { UniqueIdentifier } from "./unique-identifier";

export interface StudentEntityProps {
  account: AccountEntity;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class StudentEntity extends BaseEntity<StudentEntityProps> {
  get account(): AccountEntity {
    return this.props.account;
  }

  set account(acc: AccountEntity) {
    this._props.account = acc;
  }

  get firstName(): string {
    return this.props.firstName;
  }
  get lastName(): string {
    return this.props.lastName;
  }
  get avatarUrl(): string | undefined {
    return this.props.avatarUrl;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  static create(props: StudentEntityProps, id?: string): StudentEntity {
    return new StudentEntity(props, new UniqueIdentifier(id));
  }
}
