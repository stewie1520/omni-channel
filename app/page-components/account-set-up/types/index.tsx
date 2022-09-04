import type { CountryService } from "~/core/application/service/country.service";
import type { ArrayElement } from "~/libs/types";

export type Country = ArrayElement<
  Awaited<ReturnType<CountryService["getAll"]>>
>;
