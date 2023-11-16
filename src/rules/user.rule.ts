import { defineAbility } from "@casl/ability";
import { Account } from "@prisma/client";

export default (accountId?: string) =>
  defineAbility((can, cannot) => {
    can("create", "Calendar");

    if (accountId) {
      can("read", "Calendar", { accountId: accountId });
      can("update", "Calendar", { accountId: accountId });
      can("delete", "Calendar", { accountId: accountId });
    }
  });
