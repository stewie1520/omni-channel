import { UserRepository } from "~/core/application/store/user.repository";
import { injectable, inject } from "inversify";
import type { HashService } from "~/core/application/service/hash.service";
import { HASH_SERVICE } from "~/core/application/service/hash.service";
import type {
  CreateLoginEmailUserRequestDto,
  CreateLoginEmailUserResponseDto
} from "~/core/application/dtos/create-login-email-user.dto";
import type { UserEntity } from "~/core/domain/entities/user.entity";

@injectable()
export class AccountService {
  constructor(@inject(UserRepository) private userRepository: UserRepository, @inject(HASH_SERVICE) private hashService: HashService) {}

  async checkEmailTaken(email: string): Promise<boolean> {
    const user = await this.userRepository.getUserByEmail(email);
    return user !== null;
  }

  async createUserByEmail(dto: CreateLoginEmailUserRequestDto): Promise<CreateLoginEmailUserResponseDto> {
    const hashedPassword = await this.hashService.hash(dto.password);

    const user = await this.userRepository.createUserByEmail({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: hashedPassword,
    });

    return {
      id: user.id,
    };
  } catch (err: any) {
    throw { error: err };
  }

  async verifyLoginByEmail(request: { email: string, password: string }): Promise<UserEntity | null> {
    const userWithPassword = await this.userRepository.getUserByEmail(request.email);

    if (!userWithPassword || !userWithPassword.password) {
      return null;
    }

    const isValid = await this.hashService.compare(request.password, userWithPassword.password);

    if (!isValid) {
      return null;
    }

    return userWithPassword;
  }
}
