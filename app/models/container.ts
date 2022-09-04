import { Container } from "inversify";
import { prisma, PRISMA_CLIENT } from "~/db.server";
import { userModule } from "~/models/user/user.module";
import { commonModule } from "./common/common.module";

const container = new Container();
container.bind(PRISMA_CLIENT).toConstantValue(prisma);
container.load(userModule, commonModule);

export { container };
