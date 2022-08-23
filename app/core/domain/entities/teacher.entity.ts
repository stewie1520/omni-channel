import type { TeacherTitle } from "../enums/teacher-title.enum";
import type { AccountEntity } from "./account.entity";
import { BaseEntity } from "./base.entity";

export interface TeacherEntityProps {
  account: AccountEntity;
  id: string;
  title: TeacherTitle;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export class TeacherEntity extends BaseEntity<TeacherEntityProps> {
  get title(): TeacherTitle {
    return this.props.title;
  }

  get account(): AccountEntity {
    return this.props.account;
  }
  get firstName(): string {
    return this.props.firstName;
  }
  get lastName(): string {
    return this.props.lastName;
  }
  get avatarUrl(): string {
    return this.props.avatarUrl;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
