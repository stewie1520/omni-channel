import { BaseEntity } from "./base.entity";
import { UniqueIdentifier } from "./unique-identifier";

export interface CountryProps {
  code: string;
  name: string;
  flagCode: string;
  timezone: string;
  variant?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CountryEntity extends BaseEntity<CountryProps> {
  get code(): string {
    return this.props.code;
  }

  get name(): string {
    return this.props.name;
  }

  get flagCode(): string {
    return this.props.flagCode;
  }

  get timezone(): string {
    return this.props.timezone;
  }

  get variant(): string | undefined {
    return this.props.variant;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  static create(props: CountryProps, id?: string): CountryEntity {
    return new CountryEntity(props, new UniqueIdentifier(id));
  }
}
