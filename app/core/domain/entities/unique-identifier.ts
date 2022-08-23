import { nanoid } from "nanoid";
import { Identifier } from "./identifier";

export class UniqueIdentifier extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id || nanoid());
  }

  toString() {
    return this.value.toString();
  }
}
