import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { CountryRepository } from "~/core/application/store/country.repository";
import { CountryEntity } from "~/core/domain/entities/country.entity";
import { PRISMA_CLIENT } from "~/db.server";

@injectable()
export class PostgresCountryRepository extends CountryRepository {
  async getAll(): Promise<CountryEntity[]> {
    const countries = await this.prismaClient.country.findMany();
    return countries.map((country) =>
      CountryEntity.create({
        name: country.name,
        code: country.code,
        createdAt: country.createdAt,
        flagCode: country.flagCode,
        timezone: country.timezone,
        updatedAt: country.updatedAt,
        variant: country.variant ?? undefined,
        phoneCode: country.phoneCode ?? undefined,
      })
    );
  }
  constructor(@inject(PRISMA_CLIENT) private prismaClient: PrismaClient) {
    super();
  }
}
