import crypto from "node:crypto";
import { readFile } from "node:fs/promises";
import { generateKeys } from "paseto-ts/v4";

const { secretKey, publicKey } = generateKeys("public");

console.log("Public key:", publicKey);
console.log("Secret key:", secretKey);
