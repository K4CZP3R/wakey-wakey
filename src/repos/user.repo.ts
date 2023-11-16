import { BaseRepo } from "./base.repo";

export class UserRepo extends BaseRepo {
  createUser(email: string, passwordHash: string, name?: string) {
    return this.prisma.account.create({
      data: {
        email: email,
        passwordHash: passwordHash,
        name: name,
      },
    });
  }

  getUserByEmail(email: string) {
    return this.prisma.account.findUnique({
      where: {
        email: email,
      },
    });
  }
}
