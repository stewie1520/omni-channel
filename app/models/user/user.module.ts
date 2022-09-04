import { AccountController } from "./web/account.controller";
import { ContainerModule } from "inversify";
import { AccountService } from "~/core/application/service/account.service";
import type { HashService } from "~/core/application/service/hash.service";
import { HASH_SERVICE } from "~/core/application/service/hash.service";
import { StudentService } from "~/core/application/service/student.service";
import { AccountRepository } from "~/core/application/store/account.repository";
import { StudentRepository } from "~/core/application/store/student.repository";
import { BcryptHashService } from "~/models/user/service/bcrypt-hash.service";
import { PostgresAccountRepository } from "~/models/user/store/postgres-account.repository";
import { PostgresStudentRepository } from "~/models/user/store/postgres-student.repository";
import { StudentController } from "~/models/user/web/student.controller";

export const userModule = new ContainerModule((bind) => {
  bind<HashService>(HASH_SERVICE).to(BcryptHashService);
  bind<AccountRepository>(AccountRepository).to(PostgresAccountRepository);
  bind<StudentRepository>(StudentRepository).to(PostgresStudentRepository);
  bind<StudentController>(StudentController).toSelf();
  bind<AccountController>(AccountController).toSelf();
  bind<AccountService>(AccountService).toSelf();
  bind<StudentService>(StudentService).toSelf();
});
