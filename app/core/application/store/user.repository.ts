import { UserEntity } from "~/core/domain/entities/user.entity";
import { injectable } from "inversify";

@injectable()
export abstract class UserRepository {
  abstract getUserById(id: string): Promise<UserEntity | null>;
  abstract getUserByEmail(email: string): Promise<UserEntity | null>;
  abstract deleteUserByEmail(email: string): Promise<UserEntity>;
  abstract createUserByEmail(data: { email: string, password: string, lastName: string, firstName: string }): Promise<UserEntity>;
}
