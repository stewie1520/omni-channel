import { Entity, Schema } from "redis-om";
import { getRedisOMClient } from "~/redis.server";

export class AccountOTP extends Entity {}
export const AccountOTPSchema = new Schema<AccountOTP>(AccountOTP, {
  accountId: { type: "string", indexed: true },
  otpHashed: { type: "string" },
  issueDate: { type: "date" },
});

export const getAccountOTPRepository = async () => {
  const client = await getRedisOMClient();
  const repository = await client.fetchRepository<AccountOTP>(AccountOTPSchema);

  await repository.createIndex();

  return repository;
};
