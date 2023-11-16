import { z } from "zod";
import { createPrivateKey } from "crypto";

export type RawEnvironment = {
  ENVIRONMENT: string;
  SERVER_PORT: number;
  DATABASE_URL: string;
  PASETO_PUBLIC_KEY: string;
  PASETO_PRIVATE_KEY: string;
};

export const EnvironmentSchema = z.object({
  ENVIRONMENT: z.enum(["development", "production"]),
  SERVER_PORT: z.string().transform((val) => parseInt(val)),
  DATABASE_URL: z.string(),
  PASETO_PRIVATE_KEY: z.string(),
  PASETO_PUBLIC_KEY: z.string(),
});

export type Environment = z.infer<typeof EnvironmentSchema>;

/**
 * Needed to be able to strip environment from unused properties
 * (this is something like allow-list)
 *
 * There is no other way to get keys of an interface in TypeScript
 * @link https://stackoverflow.com/a/54308812
 */
type KeysEnum<T> = { [P in keyof Required<T>]: true };
export const EnvironmentKeys: KeysEnum<RawEnvironment> = {
  ENVIRONMENT: true,
  SERVER_PORT: true,
  DATABASE_URL: true,
  PASETO_PRIVATE_KEY: true,
  PASETO_PUBLIC_KEY: true,
};
