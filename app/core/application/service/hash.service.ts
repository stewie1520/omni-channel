export const HASH_SERVICE = Symbol();

export interface HashService {
  hash(password: string): Promise<string>;

  compare(password: string, hash: string): Promise<boolean>;
}
