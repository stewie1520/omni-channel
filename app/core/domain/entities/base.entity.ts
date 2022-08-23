import { UniqueIdentifier } from "./unique-identifier";

export const isEntity = (
  entity: unknown
): entity is BaseEntity<BaseEntityProps> => {
  return entity instanceof BaseEntity;
};

export type BaseEntityProps = {};

export abstract class BaseEntity<TProps extends BaseEntityProps> {
  constructor(props: TProps, id?: UniqueIdentifier) {
    this._props = props;
    this._id = id || new UniqueIdentifier();
  }

  private _props: TProps;
  private readonly _id: UniqueIdentifier;

  get id() {
    return this._id;
  }

  get props() {
    return this._props;
  }

  public equals(other?: BaseEntity<TProps>): boolean {
    if (!other) return false;

    if (this === other) return true;

    if (!isEntity(other)) return false;

    return this.id.equals(other.id);
  }
}
