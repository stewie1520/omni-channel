import { injectable } from "inversify";
import type { CountryEntity } from "../../domain/entities/country.entity";

@injectable()
export abstract class CountryRepository {
  abstract getAll(): Promise<CountryEntity[]>;
}
