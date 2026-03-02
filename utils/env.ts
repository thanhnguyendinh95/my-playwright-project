import * as dotenv from "dotenv";

type EnvShape = {
  BASE_URL: string;

};

let cached: EnvShape | null = null;

export function loadEnv(required: (keyof EnvShape)[] = ["BASE_URL"]): EnvShape {
  if (cached) return cached;

  // Load .env if present (safe even if missing)
  dotenv.config();

  const env: EnvShape = {
    BASE_URL: process.env.BASE_URL || "",
  };

  const missing = required.filter((k) => !env[k]);
  if (missing.length) {
    throw new Error(
      `[env] Missing required env vars: ${missing.join(", ")}. ` +
      `Create a .env file (see .env.example).`
    );
  }

  cached = env;
  return env;
}
