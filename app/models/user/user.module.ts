import { ContainerModule } from "inversify";
import type { HashService } from "~/core/application/service/hash.service";
import { HASH_SERVICE } from "~/core/application/service/hash.service";
import { BcryptHashService } from "~/models/user/service/bcrypt-hash.service";
import { AccountService } from "~/core/application/service/account.service";
import { AccountRepository } from "~/core/application/store/account.repository";
import { PostgresAccountRepository } from "~/models/user/store/postgres-account.repository";
import { StudentRepository } from "~/core/application/store/student.repository";
import { PostgresStudentRepository } from "~/models/user/store/postgres-student.repository";
import { StudentController } from "~/models/user/web/student.controller";
import { StudentService } from "~/core/application/service/student.service";
import { AccountController } from "./web/account.controller";

export const userModule = new ContainerModule((bind) => {
  bind<HashService>(HASH_SERVICE).to(BcryptHashService);
  bind<AccountRepository>(AccountRepository).to(PostgresAccountRepository);
  bind<StudentRepository>(StudentRepository).to(PostgresStudentRepository);
  bind<StudentController>(StudentController).toSelf();
  bind<AccountController>(AccountController).toSelf();
  bind<AccountService>(AccountService).toSelf();
  bind<StudentService>(StudentService).toSelf();
});
