import dotenv from "dotenv";
import _ from "lodash";
import {
  Environment,
  EnvironmentKeys,
  EnvironmentSchema,
  RawEnvironment,
} from "../models/environment.type";

dotenv.config();

export function getEnvironment(): RawEnvironment {
  return _.pick(
    process.env,
    Object.keys(EnvironmentKeys)
  ) as unknown as RawEnvironment;
}

export function getParsedEnvironment(): Environment {
  return EnvironmentSchema.parse(getEnvironment());
}
