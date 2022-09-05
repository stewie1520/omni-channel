import { inject, injectable } from "inversify";
import type { CountryResponse } from "../dtos/country.dto";
import { CountryRepository } from "../store/country.repository";

@injectable()
export class CountryService {
  constructor(
    @inject(CountryRepository)
    private readonly countryRepository: CountryRepository
  ) {}

  async getAll(): Promise<CountryResponse[]> {
    const countryEntities = await this.countryRepository.getAll();
    return countryEntities.map((countryEntity) => ({
      code: countryEntity.code,
      name: countryEntity.name,
      flagCode: countryEntity.flagCode,
      phoneCode: countryEntity.phoneCode,
      variant: countryEntity.variant,
      timezone: countryEntity.timezone,
      createdAt: countryEntity.createdAt,
      updatedAt: countryEntity.updatedAt,
    }));
  }
}
