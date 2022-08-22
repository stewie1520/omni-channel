import { ContainerModule } from 'inversify';
import { HASH_SERVICE, HashService } from "~/core/application/service/hash.service";
import { BcryptHashService } from "~/models/user/service/bcrypt-hash.service";
import { AccountService } from "~/core/application/service/account.service";
import { UserRepository } from "~/core/application/store/user.repository";
import { PostgresUserRepository } from "~/models/user/store/postgres-user.repository";
import { UserController } from "~/models/user/web/user.controller";

export const userModule = new ContainerModule((bind) => {
  bind<HashService>(HASH_SERVICE).to(BcryptHashService);
  bind<UserRepository>(UserRepository).to(PostgresUserRepository);
  bind<AccountService>(AccountService).toSelf();
  bind<UserController>(UserController).toSelf();
});

