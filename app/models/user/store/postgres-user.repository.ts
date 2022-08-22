import { UserRepository } from "~/core/application/store/user.repository";
import { inject, injectable } from "inversify";
import { PRISMA_CLIENT } from "~/db.server";
import type { PrismaClient } from "@prisma/client";
import type { UserEntity } from "~/core/domain/entities/user.entity";

@injectable()
export class PostgresUserRepository extends UserRepository {
  constructor(@inject(PRISMA_CLIENT) private prismaClient: PrismaClient) {
    super();
  }

  async deleteUserByEmail(email: string): Promise<UserEntity> {
    return this.prismaClient.user.delete({ where: { email } });
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prismaClient.user.findUnique({ where: { email } });
    if (user === null) return null;

    return user;
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    const user = await this.prismaClient.user.findUnique({ where: { id } });
    if (user === null) return null;

    return user;
  }

  createUserByEmail(data: { email: string; password: string; lastName: string; firstName: string }): Promise<UserEntity> {
    return this.prismaClient.user.create({ data });
  }
}
