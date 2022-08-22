import { Container } from 'inversify';
import { userModule } from "~/models/user/user.module";
import { prisma, PRISMA_CLIENT } from "~/db.server";

const container = new Container();
container.bind(PRISMA_CLIENT).toConstantValue(prisma);
container.load(userModule);

export { container };
