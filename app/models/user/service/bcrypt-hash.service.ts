import bcryptjs from "bcryptjs";
import { HashService } from "~/core/application/service/hash.service";
import { injectable } from "inversify";

@injectable()
export class BcryptHashService implements HashService {
  async hash(password: string): Promise<string> {
    return await bcryptjs.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcryptjs.compare(password, hash);
  }
}
