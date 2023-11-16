import { Account } from "@prisma/client";
import { sign, verify } from "paseto-ts/v4";

export class TokenHelper {
  constructor(private privateKey: string, private publicKey: string) {}

  createTokenFor(account: Account) {
    console.log("Creating token for", account);
    const token = sign(this.privateKey, {
      id: account.id,
      email: account.email,
      name: account.name,
    });

    console.log("Token:", token);
    return token;
  }

  verifyToken(token: string) {
    return verify(this.publicKey, token);
  }
}
