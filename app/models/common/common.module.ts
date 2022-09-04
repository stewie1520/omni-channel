import { ContainerModule } from "inversify";
import { CountryService } from "~/core/application/service/country.service";
import { CountryRepository } from "~/core/application/store/country.repository";
import { PostgresCountryRepository } from "./store/postgres-country.repository";

export const commonModule = new ContainerModule((bind) => {
  bind<CountryRepository>(CountryRepository).to(PostgresCountryRepository);
  bind<CountryService>(CountryService).toSelf();
});
