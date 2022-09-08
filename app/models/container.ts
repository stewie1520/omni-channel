import { Container } from "inversify";
import { prisma, PRISMA_CLIENT } from "~/db.server";
import { redisClient, REDIS_CLIENT } from "~/redis.server";
import { userModule } from "~/models/user/user.module";
import { commonModule } from "./common/common.module";

const container = new Container();
container.bind(PRISMA_CLIENT).toConstantValue(prisma);
container.bind(REDIS_CLIENT).toConstantValue(redisClient);
container.load(userModule, commonModule);

export { container };
