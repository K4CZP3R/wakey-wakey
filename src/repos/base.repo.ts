import { PrismaClient } from "@prisma/client";
import { Inject } from "../helpers/dependency-injection";
import { PRISMA_INSTANCE } from "../consts";

export type Context = {
  userId?: string;
};

export class BaseRepo {
  @Inject<PrismaClient>(PRISMA_INSTANCE)
  prisma!: PrismaClient;

  constructor(protected context?: Context) {}
}
