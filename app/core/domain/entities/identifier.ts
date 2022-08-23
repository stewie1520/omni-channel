export abstract class Identifier<T> {
  constructor(public readonly value: T) {}
  equals(other?: Identifier<T>): boolean {
    if (!other) {
      return false;
    }

    return this.value === other.value;
  }

  valueOf(): T {
    return this.value;
  }
}
